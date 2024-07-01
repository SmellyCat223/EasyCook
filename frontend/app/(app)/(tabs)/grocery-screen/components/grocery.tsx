import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert } from "react-native";
import { supabase } from '../../../../supabase';
import Filter from '../../../../../components/filter';
import ButtonAdd from '../../../../../components/button-add';
import Button4 from '../../../../../components/button4';
import { Item } from '../../../../types';
import { useRouter } from 'expo-router';

const GroceryBody: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);

    useEffect(() => {
        const fetchShoppingListId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                const userId = data.session.user.id;
                // Fetch Shopping List id based on user id
                const { data: shoppingListId, error: createError } = await supabase
                    .from('shopping_list')
                    .select('shopping_list_id')
                    .eq('user_id', userId)
                    .single();
                
                // if (createError) {
                //     console.error('Error fetching ShoppingList:', createError);
                // }
                
                if (shoppingListId) {
                    setShoppingListId(shoppingListId.shopping_list_id);
                } else {
                    console.log('No ShoppingList found for user. Creating new ShoppingList...');
                    // Create a new ShoppingList for the user
                    const { data: newShoppingListId, error: newcreateError } = await supabase
                        .from('shopping_list')
                        .insert([{ user_id: userId }]);

                    if (newcreateError) {
                        console.error('Error creating new Shopping List:', newcreateError);
                        Alert.alert('Error', 'Failed to create new Shopping List');
                        return;
                    }

                    if (newShoppingListId) {
                        setShoppingListId(newShoppingListId);
                        Alert.alert('Success', 'New Shopping List created');
                    }
                }
            }
        };

        fetchShoppingListId();
    }, []);

    useEffect(() => {
        if (shoppingListId) {
            fetchItems(shoppingListId);
        }
    }, [shoppingListId]);

    const fetchItems = async (shoppingListId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select('*')
            .eq('item_shopping_list_id', shoppingListId); // Filter items based on shoppingListId

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
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <ButtonAdd onPress={() => handlePress("./components/add-grocery")} />
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
                    <Button4
                        key={item.item_id}
                        text1={item.item_name}
                        text2={`${item.item_quantity}g`}
                        icon1="check-box-outline-blank"
                        onPress={() => console.log(`Pressed item ${item.item_name}`)}
                        path=""
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default GroceryBody;
