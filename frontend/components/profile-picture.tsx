import React, { useState, useEffect } from 'react';
import { Text, View, Image } from "react-native";
import { supabase } from '../app/supabase';

const ProfilePicture = () => {

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

    useEffect(() => {
        if (userId) {
            fetchUsername(userId);
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
                // Animated.timing(fadeAnim, {
                //     toValue: 1,
                //     duration: 1000, // Adjust duration as needed
                //     useNativeDriver: true,
                // }).start();
            }
        } catch (error: any) {
            console.error('Error fetching username:', error.message);
        }
    };

    return (
        <View className="flex py-4 justify-center items-center">
            <Image
                source={{
                    uri: "https://i.pinimg.com/564x/af/64/49/af6449c9ece35104f7e351c0c6f8c132.jpg",
                }}
                style={{ width: 150, height: 150 }}
                className="rounded-full"
            />
            <View className="py-2">
                <Text className="text-lg text-white">{username ? username : 'Guest'} </Text>
            </View>
        </View>
    );
};

export default ProfilePicture;
