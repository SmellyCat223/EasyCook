// import React from 'react';
// import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
// import { Icon } from 'react-native-elements';
// import { Link } from 'expo-router';
// import Button3 from '../../../../components/button3';

// const Inventory = () => {
//     return (
//         <View className="flex-1 bg-stone-950">
//             <View className="p-4">
//                 <Text className="text-base text-zinc-100">This is inventory page</Text>
//                 <Filter />
//             </View>
//             <Body />
//         </View>
//     )
// }

// const Filter = () => {
//     return (
//         <View className="flex flex-row pt-3 pb-3 justify-between">
//             <View className="flex flex-row rounded-2xl p-2 w-4/5 bg-zinc-200">
//                 <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
//                 <Text className="text-zinc-500">  Search Item</Text>
//             </View>
//             <Text className="text-yellow-500">Filter</Text>
//         </View>
//     );
// };

// const Body = () => {

//     return (
//         <View className="flex-1 bg-stone-950">
//             <Button3 text1="Item" text2="Exipration Date" text3="Quantity" onPress={() => console.log("i'm pressed")} />
//             <Button3 text1="fish" text2="02/04/2025" text3="100g" onPress={() => console.log("i'm pressed")} />
//         </View>
//     )
// }

// export default Inventory;

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { supabase } from '../../../../supabase';
import Button3 from '../../../../components/button3';
import Filter from '../../../../components/filter';
import { Item, Ingredient } from '../../../../types';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Text className="text-base text-zinc-100">This is inventory page</Text>
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
    return (
        <View className="flex-1 bg-stone-950">
            <ScrollView>
                {items.map(item => (
                    <Button3
                        key={item.item_id}
                        text1={item.item_name}
                        text2={new Date(item.expiration_date).toLocaleDateString()}
                        text3={`${item.item_quantity}g`}
                        // onPress={() => console.log(`Pressed item ${item.item_id}`)}
                        onPress={() => console.log(`Pressed item ${item.item_id}`)} path=""
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Inventory;