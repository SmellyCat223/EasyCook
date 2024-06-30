import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import { supabase } from '../../../../../supabase';
import Button3 from '../../../../../../components/button-inventory';
import Filter from '../../../../../../components/filter';
import ButtonAdd from '../../../../../../components/button-add';
import { Item } from '../../../../../types';
import { useRouter, useNavigation } from 'expo-router';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase
            .from('item')
            .select(
                `
                item_id,
                ingredient_id,
                inventory_id,
                shopping_list_id,
                item_quantity,
                expiration_date,
                purchase_date,
                mfg,
                ...ingredient!inner(
                item_name:ingredient_name
                )
                `,
            );
    
        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePress = (path: string) => {
        router.push(path);
    };

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Text className="text-base text-zinc-100">This is inventory page</Text>
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <ButtonAdd onPress={ () => handlePress("./add-item") }/>
            <Body items={filteredItems} />
        </View>
    );
};

interface BodyProps {
    items: Item[];
}

const Body: React.FC<BodyProps> = ({ items }) => {
    return (
        <View className="flex-1 bg-stone-950">
            <ScrollView>
                {items.map(item => (
                    <Button3
                        key={item.item_id}
                        text1={item.item_name}
                        text2={new Date(item.expiration_date).toLocaleDateString()}
                        text3={`${item.item_quantity}g`}
                        onPress={() => console.log(`Pressed item ${item.item_name}`)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Inventory;
