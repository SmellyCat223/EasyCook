import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Alert } from "react-native";
import { Checkbox } from 'react-native-paper';
import { supabase } from '../../../../supabase';
import Filter from '../../../../../components/filter';
import ButtonAdd from '../../../../../components/button-add';
import Button4 from '../../../../../components/button4';
import { Item } from '../../../../types';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const GroceryBody: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();
    const [userId, setUserId] = useState<string>('');
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchShoppingListId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                const userID = data.session.user.id;
                setUserId(userID);
                
                const { data: shoppingListData, error: shoppingListError } = await supabase
                    .from('shopping_list')
                    .select('shopping_list_id')
                    .eq('user_id', userId)
                    .single();

                if (shoppingListError) {
                    console.error('Error fetching shopping list:', shoppingListError);
                }

                if (shoppingListData) {
                    setShoppingListId(shoppingListData.shopping_list_id);
                } else {
                    console.log('No shopping list found for user. Creating new shopping list...');
                    const { data: newShoppingListData, error: newShoppingListError } = await supabase
                        .from('shopping_list')
                        .insert([{ user_id: userId }])
                        .select('shopping_list_id')
                        .single();

                    if (newShoppingListError) {
                        console.error('Error creating new shopping list:', newShoppingListError);
                        Alert.alert('Error', 'Failed to create new shopping list');
                        return;
                    }

                    if (newShoppingListData) {
                        setShoppingListId(newShoppingListData.shopping_list_id);
                        Alert.alert('Success', 'New shopping list created');
                    }
                }
                // Fetch inventory ID
                const { data: inventoryData, error: inventoryError } = await supabase
                    .from('inventory')
                    .select('inventory_id')
                    .eq('user_id', userId)
                    .single();

                if (inventoryError) {
                    console.error('Error fetching inventory:', inventoryError);
                } else if (inventoryData) {
                    setInventoryId(inventoryData.inventory_id);
                } else {
                    console.log('No inventory found for user.');
                }
            }
        };

        fetchShoppingListId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (shoppingListId) {
                fetchItems(shoppingListId);
            }
        }, [shoppingListId])
    );

    const fetchItems = async (shoppingListId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select('*')
            .eq('item_shopping_list_id', shoppingListId)
            .is('item_inventory_id', null);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const handlePress = (path: string) => {
        router.push({
            pathname: path,
            params: { inventoryId, userId }
        });
    };

    const handleCheckboxChange = async (item: Item) => {
        const { data, error } = await supabase
            .from('item')
            .update({ 
                item_inventory_id: inventoryId,
                purchase_date: new Date()
            })
            .eq('item_id', item.item_id);
        if (error) {
            console.error('Error updating item:', error);
        } else {
            // Remove the item from the local state
            setItems(prevItems => prevItems.filter(i => i.item_id !== item.item_id));
            setChecked(!checked);
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
            <ButtonAdd onPress={() => handlePress("./components/add-grocery")} />
            <Body items={filteredItems} onCheckboxChange={handleCheckboxChange} />
        </View>
    );
};

interface BodyProps {
    items: Item[];
    onCheckboxChange: (item: Item) => void;
}

const Body: React.FC<BodyProps> = ({ items, onCheckboxChange }) => {
    return (
        <View className="flex-1 bg-stone-950">
            <ScrollView>
                {items.map(item => (
                    <View key={item.item_id}>
                        <Button4
                            text1={item.item_name}
                            text2={`${item.item_quantity}g`}
                            pred={item.item_inventory_id}
                            onPress1={() => onCheckboxChange(item)}
                            onPress2={() => console.log(`Pressed item ${item.item_name}`)}
                        />                        
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default GroceryBody;