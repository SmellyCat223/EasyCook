// import React, { useState, useEffect, useCallback } from 'react';
// import { View, ScrollView, Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
// import { supabase } from '../../../../supabase';
// import Button3 from '../../../../../components/button3';
// import ButtonAdd from '../../../../../components/button-add';
// import Filter from '../../../../../components/filter';
// import { Item } from '../../../../types';
// import { useRouter } from 'expo-router';
// import { useFocusEffect } from '@react-navigation/native';
// import AddItem from './add-item';
// import EditItem from './edit-item';


// const Inventory: React.FC = () => {
//     const [items, setItems] = useState<Item[]>([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [userId, setUserId] = useState<string | null>(null);
//     const [inventoryId, setInventoryId] = useState<string | null>(null);
//     const [modalVisible, setModalVisible] = useState(false);

//     const router = useRouter();

//     useEffect(() => {
//         const fetchInventoryId = async () => {
//             const { data, error } = await supabase.auth.getSession();
//             if (error) {
//                 console.error('Error fetching user session:', error);
//             } else if (data?.session) {
//                 const userId = data.session.user.id;
//                 setUserId(userId);
//                 const { data: inventoryData, error: inventoryError } = await supabase
//                     .from('inventory')
//                     .select('inventory_id')
//                     .eq('user_id', userId)
//                     .single();

//                 if (inventoryError) {
//                     console.error('Error fetching inventory:', inventoryError);
//                 }

//                 if (inventoryData) {
//                     setInventoryId(inventoryData.inventory_id);
//                 } else {
//                     console.log('No inventory found for user. Creating new inventory...');
//                     const { data: newInventoryData, error: newInventoryError } = await supabase
//                         .from('inventory')
//                         .insert([{ user_id: userId }])
//                         .select('inventory_id')
//                         .single();

//                     if (newInventoryError) {
//                         console.error('Error creating new inventory:', newInventoryError);
//                         Alert.alert('Error', 'Failed to create new inventory');
//                         return;
//                     }

//                     if (newInventoryData) {
//                         setInventoryId(newInventoryData.inventory_id);
//                         Alert.alert('Success', 'New inventory created');
//                     }
//                 }
//             }
//         };

//         fetchInventoryId();
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             if (inventoryId) {
//                 fetchItems(inventoryId);
//             }
//         }, [inventoryId])
//     );

//     const fetchItems = async (inventoryId: string) => {
//         const { data, error } = await supabase
//             .from('item')
//             .select('*')
//             .eq('item_inventory_id', inventoryId);

//         if (error) {
//             console.error('Error fetching items:', error);
//         } else if (data) {
//             setItems(data);
//         }
//     };

//     const handleAddItem = () => {
//         router.push({
//             pathname: './add-item',
//             params: {inventoryId}
//         });
//     };

//     const handleEditItem = (itemId: string) => {
//         router.push({
//             pathname: './edit-item',
//             params: { itemId }
//         });
//     };

//     const filteredItems = items.filter(item =>
//         item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <View className="flex-1 bg-stone-950">
//             <View className="px-4 py-2">
//                 <Filter setSearchQuery={setSearchQuery} />
//             </View>
//             <ButtonAdd onPress={() => setModalVisible(true)} />
//             <Body items={filteredItems} onAddItem={handleAddItem} onEditItem={handleEditItem} />

//             <Modal
//                 animationType="none"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//                     <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
//                         <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
//                             <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
//                                     <AddItem
//                                         inventoryId={inventoryId}
//                                         userId={userId}
//                                         onClose={() => setModalVisible(false)}
//                                     />
//                             </View>
//                         </TouchableWithoutFeedback>                        
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>

//             <Modal
//                 animationType="none"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//                     <View className="flex flex-1 justify-center items-center bg-stone-950/70 bg-opacity-50">
//                         <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
//                             <View className="bg-zinc-800 p-4 rounded-2xl w-5/6">
//                                     <EditItem
//                                         itemId={userId}
//                                         onClose={() => setModalVisible(false)}
//                                     />
//                             </View>
//                         </TouchableWithoutFeedback>                        
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>
//         </View>
//     );
// };

// interface BodyProps {
//     items: Item[];
//     onAddItem: () => void;
//     onEditItem: (itemId: string) => void;
// }

// const Body: React.FC<BodyProps> = ({ items, onAddItem, onEditItem }) => {
//     return (
//         <View className="flex-1 bg-stone-950">
//             <View className="border-b border-t border-zinc-800">
//             </View>
//             <ScrollView>
//                 {items.map(item => (
//                     <Button3
//                         key={item.item_id}
//                         text1={item.item_name}
//                         text2={new Date(item.expiration_date).toLocaleDateString()}
//                         text3={`${item.item_quantity}g`}
//                         onPress={() => onEditItem(item.item_id)}
//                         path=""
//                     />
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// export default Inventory;

import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, Modal, TouchableWithoutFeedback, Keyboard, Text, Button } from "react-native";
import { supabase } from '../../../../supabase';
import ButtonAdd from '../../../../../components/button-add';
import Button3 from '../../../../../components/button3';
import Filter from '../../../../../components/filter';
import { Item } from '../../../../types';
import { useFocusEffect } from '@react-navigation/native';
import AddItem from './add-item';
import EditItem from './edit-item';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string>('');
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventoryId = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Error fetching user session:', error);
                    return;
                }
                const userId = data?.session?.user?.id;
                if (!userId) {
                    console.error('User ID not found in session');
                    return;
                }
                setUserId(userId);

                const { data: inventoryData, error: inventoryError } = await supabase
                    .from('inventory')
                    .select('inventory_id')
                    .eq('user_id', userId)
                    .single();

                if (inventoryError) {
                    console.error('Error fetching inventory:', inventoryError);
                    return;
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
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };

        fetchInventoryId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (inventoryId) {
                fetchItems(inventoryId);
            }
        }, [inventoryId, editItemModalVisible])
    );

    const fetchItems = async (inventoryId: string) => {
        try {
            const { data, error } = await supabase
                .from('item')
                .select('*')
                .eq('item_inventory_id', inventoryId);

            if (error) {
                console.error('Error fetching items:', error);
                return;
            }

            if (data) {
                setItems(data);
            }
        } catch (error) {
            console.error('Unexpected error fetching items:', error);
        }
    };

    const handleAddItem = () => {
        setAddItemModalVisible(true);
    };

    const handleEditItem = (itemId: string) => {
        setSelectedItemId(itemId);
        setEditItemModalVisible(true);
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            const { error } = await supabase
                .from('item')
                .delete()
                .eq('item_id', itemId);

            if (error) {
                throw error;
            }

            Alert.alert('Success', 'Item deleted successfully');
            fetchItems(inventoryId); // Refresh items after deletion
        } catch (error) {
            console.error('Error deleting item:', error.message);
            Alert.alert('Error', error.message);
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

            <Button3
                        text1="Item Name"
                        text2="Expiry Date"
                        text3="Quantity"
                        onPress={() => console.log("I'm pressed")}
                        path=""
                    />
            <ButtonAdd onPress={() => setAddItemModalVisible(true)} />
            <Body items={filteredItems} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />

            {/* Add Item Modal */}
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
                                <AddItem
                                    inventoryId={inventoryId}
                                    userId={userId}
                                    onClose={() => setAddItemModalVisible(false)}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Edit Item Modal */}
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
                                    <EditItem
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
    onEditItem: (itemId: string) => void;
    onDeleteItem: (itemId: string) => void;
}

const Body: React.FC<BodyProps> = ({ items, onEditItem, onDeleteItem }) => {
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
