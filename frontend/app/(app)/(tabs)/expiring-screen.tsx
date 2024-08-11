import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from "react-native";
import { supabase } from '../../supabase';
import Button3 from '../../../components/button3';
import Filter from '../../../components/filter';
import { Item } from '../../types';
import { differenceInDays, parseISO } from 'date-fns';

const ExpiringScreen: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [inventoryId, setInventoryId] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventoryId = async () => {
            try {
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
                    } else {
                        setInventoryId(inventoryData.inventory_id);
                    }
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventoryId();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            if (!inventoryId) return;

            try {
                const { data, error } = await supabase
                    .from('item')
                    .select('*')
                    .not('expiration_date', 'is', null)
                    .eq('item_inventory_id', inventoryId) // Fetch items based on item_inventory_id
                    .order('expiration_date', { ascending: true });

                if (error) {
                    console.error('Error fetching items:', error);
                } else {
                    const today = new Date();
                    const expiringItems = data.filter((item) => {
                        const expirationDate = parseISO(item.expiration_date);
                        const daysUntilExpiration = differenceInDays(expirationDate, today);
                        console.log(`Item: ${item.item_name}, Days until expiration: ${daysUntilExpiration}`); // Debug statement

                        return daysUntilExpiration > 0 && daysUntilExpiration <= 7;
                    });

                    setItems(expiringItems);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [inventoryId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
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
                {items.map(item => {
                    const daysUntilExpiration = differenceInDays(parseISO(item.expiration_date), new Date());
                    const unit = daysUntilExpiration > 1 ? "days" : "day";

                    return (
                        <View key={item.item_id}>
                            <Button3
                                text1={item.item_name} // Wrap text within <Text> component
                                text2={`${daysUntilExpiration.toLocaleString()} ${unit}`}
                                text3={`${item.item_quantity}g`}
                                onPress={() => console.log(`Pressed item ${item.item_id}`)}
                                path=""
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ExpiringScreen;
