// import React, { useState, useEffect } from 'react';
// import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
// import { supabase } from '../../../../supabase';
// import Button3 from '../../../../../components/button3';
// import Filter from '../../../../../components/filter';
// import { Item } from '../../../../types';
// import { Icon } from 'react-native-elements';
// import { useRouter } from 'expo-router';

// const Inventory: React.FC = () => {
//     const [items, setItems] = useState<Item[]>([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [inventoryId, setInventoryId] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchInventoryId = async () => {
//             const { data, error } = await supabase.auth.getSession();
//             if (error) {
//                 console.error('Error fetching user session:', error);
//             } else if (data?.session) {
//                 const userId = data.session.user.id;
//                 // Fetch inventory id based on user id
//                 const { data: inventoryId, error: createError } = await supabase
//                     .from('inventory')
//                     .select('inventory_id')
//                     .eq('user_id', userId)
//                     .single();
                
//                 if (createError) {
//                     console.error('Error fetching inventory:', createError);
//                 }
                
//                 if (inventoryId) {
//                     setInventoryId(inventoryId.inventory_id);
//                 } else {
//                     console.log('No inventory found for user. Creating new inventory...');
//                     // Create a new inventory for the user
//                     const { data: newInventoryId, error: newcreateError } = await supabase
//                         .from('inventory')
//                         .insert([{ user_id: userId }]);

//                     if (newcreateError) {
//                         console.error('Error creating new inventory:', newcreateError);
//                         Alert.alert('Error', 'Failed to create new inventory');
//                         return;
//                     }

//                     if (newInventoryId) {
//                         setInventoryId(newInventoryId);
//                         Alert.alert('Success', 'New inventory created');
//                     }
//                 }
//             }
//         };

//         fetchInventoryId();
//     }, []);

//     useEffect(() => {
//         if (inventoryId) {
//             fetchItems(inventoryId);
//         }
//     }, [inventoryId]);

//     const fetchItems = async (inventoryId: string) => {
//         const { data, error } = await supabase
//             .from('item')
//             .select('*')
//             .eq('item_inventory_id', inventoryId); // Filter items based on inventoryId

//         if (error) {
//             console.error('Error fetching items:', error);
//         } else if (data) {
//             setItems(data);
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
//             <Body items={filteredItems} />
//         </View>
//     );
// };

// interface BodyProps {
//     items: Item[];
// }

// const Body: React.FC<BodyProps> = ({ items }) => {
//     const router = useRouter();

//     return (
//         <View className="flex-1 bg-stone-950">
//             <View className="border-b border-t border-zinc-800">
//                 <TouchableOpacity
//                     onPress={() => router.push("./add-item")}
//                     className={"flex flex-row justify-center items-center bg-zinc-700/50 h-10"}
//                 >
//                     <View className="pr-2">
//                         <Icon name="add" type="ionicons" color="#71717A" />
//                     </View>
//                     <View>
//                         <Text className="text-base text-white">Add item</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//             <ScrollView>
//                 {items.map(item => (
//                     <Button3
//                         key={item.item_id}
//                         text1={item.item_name}
//                         text2={new Date(item.expiration_date).toLocaleDateString()}
//                         text3={`${item.item_quantity}g`}
//                         onPress={() => console.log(`Pressed item ${item.item_id}`)}
//                         path=""
//                     />
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// export default Inventory;

import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { supabase } from '../../../../supabase';
import Button3 from '../../../../../components/button3';
import Filter from '../../../../../components/filter';
import { Item } from '../../../../types';
import { Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInventoryId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                const userId = data.session.user.id;
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
        router.push('./add-item');
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Filter setSearchQuery={setSearchQuery} />
            </View>
            <Body items={filteredItems} onAddItem={handleAddItem} />
        </View>
    );
};

interface BodyProps {
    items: Item[];
    onAddItem: () => void;
}

const Body: React.FC<BodyProps> = ({ items, onAddItem }) => {
    return (
        <View className="flex-1 bg-stone-950">
            <View className="border-b border-t border-zinc-800">
                <TouchableOpacity
                    onPress={onAddItem}
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
