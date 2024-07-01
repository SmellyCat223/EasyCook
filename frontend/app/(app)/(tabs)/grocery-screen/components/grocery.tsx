import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Alert } from "react-native";
import { supabase } from '../../../../supabase';
import Filter from '../../../../../components/filter';
import ButtonAdd from '../../../../../components/button-add';
import Button4 from '../../../../../components/button4';
import { Item } from '../../../../types';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

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
            .eq('item_shopping_list_id', shoppingListId);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const handlePress = (path: string) => {
        router.push(path);
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <ButtonAdd onPress={() => handlePress("./grocery-screen/components/add-grocery")} />
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

// import React, { useState, useEffect, useCallback } from 'react';
// import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
// import { supabase } from '../../../../supabase';
// import Filter from '../../../../../components/filter';
// import ButtonAdd from '../../../../../components/button-add';
// import { Item } from '../../../../types';
// import { useRouter } from 'expo-router';
// import { useFocusEffect } from '@react-navigation/native';

// const GroceryBody: React.FC = () => {
//     const [items, setItems] = useState<Item[]>([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const router = useRouter();
//     const [shoppingListId, setShoppingListId] = useState<string | null>(null);
//     const [inventoryId, setInventoryId] = useState<string | null>(null); // Assuming you have inventoryId available

//     useEffect(() => {
//         const fetchShoppingListId = async () => {
//             const { data, error } = await supabase.auth.getSession();
//             if (error) {
//                 console.error('Error fetching user session:', error);
//             } else if (data?.session) {
//                 const userId = data.session.user.id;
//                 const { data: shoppingListData, error: shoppingListError } = await supabase
//                     .from('shopping_list')
//                     .select('shopping_list_id')
//                     .eq('user_id', userId)
//                     .single();

//                 if (shoppingListError) {
//                     console.error('Error fetching shopping list:', shoppingListError);
//                 }

//                 if (shoppingListData) {
//                     setShoppingListId(shoppingListData.shopping_list_id);
//                 } else {
//                     console.log('No shopping list found for user. Creating new shopping list...');
//                     const { data: newShoppingListData, error: newShoppingListError } = await supabase
//                         .from('shopping_list')
//                         .insert([{ user_id: userId }])
//                         .select('shopping_list_id')
//                         .single();

//                     if (newShoppingListError) {
//                         console.error('Error creating new shopping list:', newShoppingListError);
//                         Alert.alert('Error', 'Failed to create new shopping list');
//                         return;
//                     }

//                     if (newShoppingListData) {
//                         setShoppingListId(newShoppingListData.shopping_list_id);
//                         Alert.alert('Success', 'New shopping list created');
//                     }
//                 }
//             }
//         };

//         fetchShoppingListId();
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             if (shoppingListId) {
//                 fetchItems(shoppingListId);
//             }
//         }, [shoppingListId])
//     );

//     const fetchItems = async (shoppingListId: string) => {
//         const { data, error } = await supabase
//             .from('shopping_list_item')
//             .select('item_id, item_name, item_quantity')
//             .eq('shopping_list_id', shoppingListId);

//         if (error) {
//             console.error('Error fetching items:', error);
//         } else if (data) {
//             setItems(data);
//         }
//     };

//     const handlePress = (path: string) => {
//         router.push(path);
//     };

//     const handleAddToInventory = async (itemId: string) => {
//         const { error } = await supabase
//             .from('inventory_item')
//             .insert([{ inventory_id: inventoryId, item_id: itemId }]);

//         if (error) {
//             console.error('Error adding item to inventory:', error);
//             Alert.alert('Error', 'Failed to add item to inventory');
//         } else {
//             Alert.alert('Success', 'Item added to inventory');
//             // Optionally update item in shopping list to indicate it's added to inventory
//             const updatedItems = items.map(item => {
//                 if (item.item_id === itemId) {
//                     return {
//                         ...item,
//                         added_to_inventory: true  // Assuming you have a field to track this
//                     };
//                 }
//                 return item;
//             });
//             setItems(updatedItems);
//         }
//     };

//     const filteredItems = items.filter(item =>
//         item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <View className="flex-1 bg-stone-950">
//             <View className="px-4 py-2">
//                 <Filter setSearchQuery={setSearchQuery} />
//             </View>
//             <ButtonAdd onPress={() => handlePress("./grocery-screen/components/add-grocery")} />
//             <Body items={filteredItems} onAddToInventory={handleAddToInventory} />
//         </View>
//     );
// };

// interface BodyProps {
//     items: Item[];
//     onAddToInventory: (itemId: string) => void;
// }

// const Body: React.FC<BodyProps> = ({ items, onAddToInventory }) => {
//     return (
//         <View className="flex-1 bg-stone-950">
//             <ScrollView>
//                 {items.map(item => (
//                     <TouchableOpacity
//                         key={item.item_id}
//                         onPress={() => onAddToInventory(item.item_id)}
//                         style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             padding: 10,
//                             borderBottomWidth: 1,
//                             borderBottomColor: '#ccc'
//                         }}
//                     >
//                         <Text style={{ flex: 1 }}>{item.item_name}</Text>
//                         <TouchableOpacity
//                             onPress={() => console.log(`Pressed checkbox for ${item.item_name}`)}
//                             style={{
//                                 width: 24,
//                                 height: 24,
//                                 borderRadius: 12,
//                                 borderWidth: 2,
//                                 borderColor: '#333',
//                                 justifyContent: 'center',
//                                 alignItems: 'center'
//                             }}
//                         >
//                             {/* You can customize the checkmark icon here */}
//                             {item.added_to_inventory && (
//                                 <Text style={{ color: '#333' }}>✓</Text>
//                             )}
//                         </TouchableOpacity>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// export default GroceryBody;