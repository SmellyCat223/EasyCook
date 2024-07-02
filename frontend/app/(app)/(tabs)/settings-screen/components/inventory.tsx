import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { supabase } from '../../../../supabase';
import Button3 from '../../../../../components/button3';
import ButtonAdd from '../../../../../components/button-add';
import Filter from '../../../../../components/filter';
import { Item } from '../../../../types';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AddItem from './add-item';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchInventoryId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                const userId = data.session.user.id;
                setUserId(userId);
                const { data: inventoryData, error: inventoryError } = await supabase
                    .from('inventory')
                    .select('inventory_id')
                    .eq('user_id', userId)
                    .single();

                if (inventoryError) {
                    console.error('Error fetching inventory:', inventoryError);
                }

                if (inventoryData) {
                    setInventoryId(inventoryData.inventory_id);
                } else {
                    console.log('No inventory found for user. Creating new inventory...');
                    const { data: newInventoryData, error: newInventoryError } = await supabase
                        .from('inventory')
                        .insert([{ user_id: userId }])
                        .select('inventory_id')
                        .single();

                    if (newInventoryError) {
                        console.error('Error creating new inventory:', newInventoryError);
                        Alert.alert('Error', 'Failed to create new inventory');
                        return;
                    }

                    if (newInventoryData) {
                        setInventoryId(newInventoryData.inventory_id);
                        Alert.alert('Success', 'New inventory created');
                    }
                }
            }
        };

        fetchInventoryId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (inventoryId) {
                fetchItems(inventoryId);
            }
        }, [inventoryId])
    );

    const fetchItems = async (inventoryId: string) => {
        const { data, error } = await supabase
            .from('item')
            .select('*')
            .eq('item_inventory_id', inventoryId);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const handleAddItem = () => {
        router.push({
            pathname: './add-item',
            params: {inventoryId}
        });
    };

    const handleEditItem = (itemId: string) => {
        router.push({
            pathname: './edit-item',
            params: { itemId }
        });
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <ButtonAdd onPress={() => setModalVisible(true)} />
            <Body items={filteredItems} onAddItem={handleAddItem} onEditItem={handleEditItem} />

            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
                        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                            <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
                                    <AddItem
                                        inventoryId={inventoryId}
                                        userId={userId}
                                        onClose={() => setModalVisible(false)}
                                    />
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
    onAddItem: () => void;
    onEditItem: (itemId: string) => void;
}

const Body: React.FC<BodyProps> = ({ items, onAddItem, onEditItem }) => {
    return (
        <View className="flex-1 bg-stone-950">
            <View className="border-b border-t border-zinc-800">
            </View>
            <ScrollView>
                {items.map(item => (
                    <Button3
                        key={item.item_id}
                        text1={item.item_name}
                        text2={new Date(item.expiration_date).toLocaleDateString()}
                        text3={`${item.item_quantity}g`}
                        onPress={() => onEditItem(item.item_id)}
                        path=""
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Inventory;