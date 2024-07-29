import React from 'react';
import { View, ScrollView } from "react-native";
import Button4 from '../../../../../components/button4';
import { Item } from '../../../../types';

interface GroceryBodyProps {
    items: Item[];
    onCheckboxChange: (item: Item) => void;
    onEditItem: (itemId: string) => void;
    checkedItems: Set<string>;
}

const GroceryBody: React.FC<GroceryBodyProps> = ({ items, onCheckboxChange, onEditItem, checkedItems }) => {
    return (
        <View className="flex-1 bg-stone-950">
            <ScrollView>
                {items.map(item => (
                    <View key={item.item_id}>
                        <Button4
                            text1={item.item_name}
                            text2={`${item.item_quantity} ${item.measurement_unit || ''}`} // Handle null measurement unit
                            pred={item.item_inventory_id}
                            isChecked={checkedItems.has(item.item_id)}
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