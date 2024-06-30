import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { supabase } from '../../supabase';
import Button3 from '../../../components/button3';
import Filter from '../../../components/filter';
import { Item } from '../../types';
import { differenceInDays, parseISO } from 'date-fns';

const ExpiringScreen: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('item')
                    .select('*')
                    .order('expiration_date', { ascending: true });

                if (error) {
                    console.error('Error fetching items:', error);
                } else {
                    const today = new Date();
                    const expiringItems = data.filter((item) => {
                        const expirationDate = parseISO(item.expiration_date);
                        const daysUntilExpiration = differenceInDays(expirationDate, today);
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
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-stone-950">
            <View className="px-4 py-2">
                <Text className="text-base text-zinc-100">This is expiring page</Text>
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