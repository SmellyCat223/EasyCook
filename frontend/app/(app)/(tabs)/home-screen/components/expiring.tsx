import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { differenceInDays, parseISO } from 'date-fns';
import { supabase } from '../../../../supabase';
import { Item } from '../../../../types';
import { Link } from 'expo-router';

const Expiring = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [inventoryId, setInventoryId] = useState<string | null>(null);

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
        const fetchItems = async () => {
            if (!inventoryId) return;

            try {
                const { data, error } = await supabase
                    .from('item')
                    .select('*')
                    .eq('item_inventory_id', inventoryId) // Fetch items based on item_inventory_id
                    .not('expiration_date', 'is', null)
                    .order('expiration_date', { ascending: true })
                    .limit(7);
                console.log(data);
                if (error) {
                    console.error('Error fetching items:', error);
                } else {
                    const today = new Date();
                    const expiringItems = data.filter((item) => {
                        const expirationDate = parseISO(item.expiration_date);
                        const daysUntilExpiration = differenceInDays(expirationDate, today);
                        return daysUntilExpiration > 0 && daysUntilExpiration <= 7;
                    });

                    setItems(expiringItems);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [inventoryId]);

    // if (loading) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }

    return (
        <Link href="/expiring-screen" asChild>
            <TouchableOpacity>
                <View className="py-1">
                    <View className="rounded-2xl p-4 bg-sky-200">
                        <View className="flex flex-row justify-between">
                            <Icon name="clockcircleo" type="antdesign" size={18} />
                            <View className="flex flex-row justify-between p-1 rounded-2xl bg-zinc-800">
                                <View className="px-2 py-1 rounded-xl bg-sky-200">
                                    <Text>Weekly</Text>
                                </View>
                                <View className="px-2 py-1 rounded-xl">
                                    <Text className="text-sky-200">Monthly</Text>
                                </View>
                            </View>
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
                                        <Text className="text-xl">{item.item_name}</Text>
                                        <Text className="text-xl">{daysUntilExpiration} {unit}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Text className="text-gray-700">More...</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default Expiring;
