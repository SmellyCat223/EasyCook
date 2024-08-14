import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { differenceInDays, parseISO } from 'date-fns';
import { supabase } from '../../../../supabase';
import { Item } from '../../../../types';
import { Link } from 'expo-router';

const Expiring = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [inventoryId, setInventoryId] = useState<string | null>(null);


    const fetchItems = async () => {
        if (!inventoryId) return;

        try {
            const { data, error } = await supabase
                .from('item')
                .select('*')
                .eq('item_inventory_id', inventoryId) // Fetch items based on item_inventory_id
                .not('expiration_date', 'is', null)
                .order('expiration_date', { ascending: true })
                .limit(10);
            if (error) {
                console.log('Error fetching items:', error);
            } else {
                const today = new Date();
                const expiringItems = data.filter((item) => {
                    const expirationDate = parseISO(item.expiration_date);
                    const daysUntilExpiration = differenceInDays(expirationDate, today);
                    return daysUntilExpiration >= 0 && daysUntilExpiration <= 7;
                });

                setItems(expiringItems);
            }
        } catch (error) {
            console.log('Error fetching items:', error);
        }
    };

    useEffect(() => {
        const fetchInventoryId = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Error fetching user session:', error);
                } else if (data?.session) {
                    const userId = data.session.user.id;
                    const { data: inventoryData, error: inventoryError } = await supabase
                        .from('inventory')
                        .select('inventory_id')
                        .eq('user_id', userId)
                        .single();

                    if (inventoryError) {
                        console.error('Error fetching inventory:', inventoryError);
                    } else {
                        setInventoryId(inventoryData.inventory_id);
                    }
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventoryId();
    }, []);

    useEffect(() => {
        fetchItems();

        if (inventoryId) {
            const channel = supabase
                .channel(`public:item:inventory_id=eq.${inventoryId}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'item' }, (payload) => {
                    console.log('Real-time update:', payload);
                    fetchItems(); // Re-fetch items on any change
                })
                .subscribe();

            // Clean up subscription on component unmount
            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [inventoryId]);

    const handleRefresh = async () => {
        await fetchItems();
    };

    return (
        <Link href="/expiring-screen" asChild>
            <TouchableOpacity>
                <View className="py-1">
                    <View className="rounded-2xl p-4 bg-sky-200">
                        <View className="flex flex-row justify-between">
                            <Icon name="clockcircleo" type="antdesign" size={18} />
                            <TouchableOpacity onPress={handleRefresh}>
                                <Icon name="refresh" type="material" size={25} color="#4A4A4A" />
                            </TouchableOpacity>
                        </View>
                        <View className="pt-2">
                            <View className="w-3/5">
                                <Text>Expiring soon</Text>
                            </View>
                            {items.map(item => {
                                const daysUntilExpiration = differenceInDays(parseISO(item.expiration_date), new Date());
                                const unit = daysUntilExpiration > 1 ? "days" : "day";

                                return (
                                    <View key={item.item_id} className="flex flex-row justify-between">
                                        <Text className="text-2xl">{item.item_name}</Text>
                                        <Text className="text-2xl ">{daysUntilExpiration} {unit}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default Expiring;
