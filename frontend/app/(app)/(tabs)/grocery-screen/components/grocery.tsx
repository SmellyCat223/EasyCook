import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Modal, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import GroceryBody from './grocery-body';
import { supabase } from '../../../../supabase';
import Filter from '../../../../../components/filter';
import { Item } from '../../../../types';
import { useFocusEffect } from '@react-navigation/native';
import AddItemGrocery from '../../../../../components/add-item-grocery';
import EditItemGrocery from '../../../../../components/edit-item-grocery';
import useDebounce from '../../../../../components/useDebounce';

const Grocery: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [changeCounter, setChangeCounter] = useState(0);
    const debouncedChangeCounter = useDebounce(changeCounter, 500); // Debounce for 500ms

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
            if (shoppingListId && debouncedChangeCounter >= 0) {
                fetchItems(shoppingListId);
            }
        }, [shoppingListId, debouncedChangeCounter])
    );

    const fetchItems = async (shoppingListId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select('*')
            .is('item_inventory_id', null)
            .eq('item_shopping_list_id', shoppingListId);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            // Log data for debugging
            // console.log('Fetched items:', data);

            setItems(data);
            const checked = new Set(data.filter(item => item.item_inventory_id).map(item => item.item_id));
            setCheckedItems(checked);
        }
    };

    const handleEditItem = (itemId: string) => {
        setSelectedItemId(itemId);
        setEditItemModalVisible(true);
    };

    const handleCheckboxChange = async (item: Item) => {
        const newCheckedItems = new Set(checkedItems);

        if (newCheckedItems.has(item.item_id)) {
            newCheckedItems.delete(item.item_id);
        } else {
            newCheckedItems.add(item.item_id);
        }

        setCheckedItems(newCheckedItems);
    };

    const handleClearAll = async () => {
        Alert.alert(
            'Alert',
            'All checked items will be added to the inventory, and all unchecked items will be deleted. Do you want to proceed?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            // Update item_inventory_id for checked items
                            const checkedItemIds = Array.from(checkedItems);
                            console.log(checkedItemIds);
                            if (checkedItemIds.length > 0) {
                                const { error: updateError } = await supabase
                                    .from('item')
                                    .update({
                                        item_inventory_id: inventoryId,
                                        purchase_date: new Date()
                                    })
                                    .in('item_id', checkedItemIds);

                                if (updateError) {
                                    console.error('Error updating checked items:', updateError);
                                    Alert.alert('Error', 'Failed to update checked items');
                                    return;
                                }
                            }

                            // Delete all unchecked items from the database
                            const uncheckedItems = items.filter(item => !checkedItems.has(item.item_id));
                            if (uncheckedItems.length > 0) {
                                const { error: deleteError } = await supabase
                                    .from('item')
                                    .delete()
                                    .in('item_id', uncheckedItems.map(item => item.item_id));

                                if (deleteError) {
                                    console.error('Error deleting unchecked items:', deleteError);
                                    Alert.alert('Error', 'Failed to delete unchecked items');
                                    return;
                                }
                            }

                            // Update the local state to remove checked and unchecked items
                            const newItems = items.filter(item => checkedItems.has(item.item_id));
                            setItems(newItems);
                            setCheckedItems(new Set(newItems.map(item => item.item_id)));
                            // Increment changeCounter to trigger the debounced fetch
                            setChangeCounter(prevCounter => prevCounter + 1);
                        } catch (error) {
                            console.error('Error in handleClearAll:', error);
                            Alert.alert('Error', 'Failed to clear all items');
                        }
                    }
                }
            ]
        );
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <View className="flex flex-row justify-evenly py-2">
                <Button title="Clear All" onPress={handleClearAll} color="red" />
                <Button title="Add Item" onPress={() => setAddItemModalVisible(true)} color="#3b82f6" />
            </View>
            <GroceryBody
                items={filteredItems}
                onEditItem={handleEditItem}
                onCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
            />
            <Modal
                animationType="none"
                transparent={true}
                visible={addItemModalVisible}
                onRequestClose={() => setAddItemModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setAddItemModalVisible(false)}>
                    <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
                                <AddItemGrocery
                                    shoppingListId={shoppingListId}
                                    userId={userId}
                                    onClose={() => {
                                        setAddItemModalVisible(false);
                                        setChangeCounter(prevCounter => prevCounter + 1);
                                    }}
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
                                <EditItemGrocery
                                    itemId={selectedItemId}
                                    onClose={() => {
                                        setEditItemModalVisible(false);
                                        setChangeCounter(prevCounter => prevCounter + 1);
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Grocery;
