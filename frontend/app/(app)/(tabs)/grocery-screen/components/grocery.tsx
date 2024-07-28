import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { supabase } from '../../../../supabase';
import Filter from '../../../../../components/filter';
import ButtonAdd from '../../../../../components/button-add';
import Button4 from '../../../../../components/button4';
import { Item } from '../../../../types';
import { useFocusEffect } from '@react-navigation/native';
import AddItemGrocery from '../../../../../components/add-item-grocery';
import EditItemGrocery from '../../../../../components/edit-item-grocery';

const GroceryBody: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        const fetchShoppingListId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                const userId = data.session.user.id;
                setUserId(userId);

                const { data: shoppingListData, error: createError } = await supabase
                    .from('shopping_list')
                    .select('shopping_list_id')
                    .eq('user_id', userId)
                    .single();

                console.log("user ", userId, "has shopping list ", shoppingListData);

                if (createError) {
                    console.error('Error fetching shopping list:', createError);
                }

                if (shoppingListData) {
                    setShoppingListId(shoppingListData.shopping_list_id);
                } else {
                    console.log('No shopping list found for user. Creating new shopping list...');
                    const { data: newShoppingListData, error: newcreateError } = await supabase
                        .from('shopping_list')
                        .insert([{ user_id: userId }])
                        .select('shopping_list_id')
                        .single();

                    if (newcreateError) {
                        console.error('Error creating new shopping list:', newcreateError);
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
        }, [shoppingListId, addItemModalVisible, editItemModalVisible])
    );

    const fetchItems = async (shoppingListId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select('*')
            .eq('item_shopping_list_id', shoppingListId);
        // .is('item_inventory_id', null);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }

        // Fetch items from the 'meal_ingredient' table
        const { data: ingredientData, error: ingredientError } = await supabase
            .from('meal_ingredient')
            .select('*')
            .eq('user_id', userId)

        if (ingredientError) {
            console.error('Error fetching meal ingredients:', ingredientError);
        }

        // Combine data from both tables
        const combinedData = [
            ...(data || []),
            ...(ingredientData?.map(ingredient => ({
                item_id: ingredient.meal_id,
                item_name: ingredient.ingredient_name,
                item_quantity: ingredient.portion_size,
                item_inventory_id: null, // Set as null or adjust based on your app logic
            })) || []),
        ];

        // Set the combined data to state
        setItems(combinedData);
    };

    const handleEditItem = (itemId: string) => {
        setSelectedItemId(itemId);
        setEditItemModalVisible(true);
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
            <ButtonAdd onPress={() => setAddItemModalVisible(true)} />
            <Body items={filteredItems} onEditItem={handleEditItem} onCheckboxChange={handleCheckboxChange} />

            <Modal
                animationType="none"
                transparent={true}
                visible={addItemModalVisible}
                onRequestClose={() => setAddItemModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setAddItemModalVisible(false)}>
                    <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
                        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                            <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
                                <AddItemGrocery
                                    shoppingListId={shoppingListId}
                                    userId={userId}
                                    onClose={() => setAddItemModalVisible(false)}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={editItemModalVisible}
                onRequestClose={() => setEditItemModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setEditItemModalVisible(false)}>
                    <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
                                {selectedItemId && (
                                    <EditItemGrocery
                                        itemId={selectedItemId}
                                        onClose={() => setEditItemModalVisible(false)}
                                    />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

interface BodyProps {
    items: Item[];
    onCheckboxChange: (item: Item) => void;
    onEditItem: (itemId: string) => void;
}

const Body: React.FC<BodyProps> = ({ items, onCheckboxChange, onEditItem }) => {
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
                            onPress2={() => onEditItem(item.item_id)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default GroceryBody;