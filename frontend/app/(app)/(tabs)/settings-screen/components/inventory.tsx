import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { supabase } from '../../../../supabase';
import Button3 from '../../../../components/button3';
import Filter from '../../../../components/filter';
import { Item } from '../../../../types';
import { Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState<string | null>(null);

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
            console.log(userId);
            fetchItems(userId);
        }
    }, [userId]);

    const fetchItems = async (userId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select(
                `
                item_id,
                item_name,
                ingredient_id,
                inventory_id,
                shopping_list_id,
                item_quantity,
                expiration_date,
                purchase_date,
                mfg,
                user_id
                `
            )
            .eq('user_id', userId); // Filter items based on user_id


        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <Body items={filteredItems} />
        </View>
    );
};

interface BodyProps {
    items: Item[];
}

const Body: React.FC<BodyProps> = ({ items }) => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-stone-950">
            <View className="border-b border-t border-zinc-800">
                <TouchableOpacity
                    onPress={() => router.push("./add-item")}
                    className={"flex flex-row justify-center items-center bg-zinc-700/50 h-10"}
                >
                    <View className="pr-2">
                        <Icon name="add" type="ionicons" color="#71717A" />
                    </View>
                    <View>
                        <Text className="text-base text-white">Add item</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {items.map(item => (
                    <Button3
                        key={item.item_id}
                        text1={item.item_name}
                        text2={new Date(item.expiration_date).toLocaleDateString()}
                        text3={`${item.item_quantity}g`}
                        onPress={() => console.log(`Pressed item ${item.item_id}`)}
                        path=""
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Inventory;