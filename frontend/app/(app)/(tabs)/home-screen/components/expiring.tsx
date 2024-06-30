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

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('item')
                    .select('*')
                    .order('expiration_date', { ascending: true });

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
    }, []);

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
                                    <View key={item.item_name} className="flex flex-row justify-between">
                                        <Text className="text-xl">{item.item_name}</Text>
                                        <Text className="text-xl">{daysUntilExpiration} {unit}</Text>
                                    </View>
                                );

                            })}
                            {/* <TouchableOpacity
                                onPress={() => router.push("../expiring-screen.tsx")}
                            >
                                <Text className="text-zinc-500">More...</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>

    );
};

export default Expiring;