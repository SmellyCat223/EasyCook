import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase'; // Adjust path as per your project structure
import { AnyObject } from 'yup';

const Header = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    // const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchUserId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                setUserId(data.session.user.id);
            }
        };

        fetchUserId();
    }, []);

    // useEffect(() => {
    //     if (userId) {
    //         fetchUsername(userId);
    //     }
    // }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUsername(userId);

            // Subscribe to real-time changes
            const subscription = supabase
                .channel(`profiles:${userId}`)
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${userId}`,
                }, (payload) => {
                    console.log('Real-time update:', payload);
                    setUsername(payload.new.username);
                })
                .subscribe();

            // Clean up subscription on component unmount
            return () => {
                supabase.removeChannel(subscription);
            };
        }
    }, [userId]);

    const fetchUsername = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching username:', error.message);
            } else if (data) {
                setUsername(data.username);
            }
        } catch (error: any) {
            console.error('Error fetching username:', error.message);
        }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>Hi {username ? username : 'Guest'} </Text>
                    <Icon name="waving-hand" type="materialicons" color="#fef08a" size={16} />
                </View>
                <Text style={{ fontSize: 16, color: '#fff' }}>Welcome back!</Text>
            </View>
        </View>
    );
};

export default Header;
