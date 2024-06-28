import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { fetchIngredients, addIngredient } from './inventoryService';
import { supabase } from '../../../../supabase';
import { Item } from '../../../../types'; 

const InventoryScreen = () => {
    const [ingredients, setIngredients] = useState<Item[]>([]);
    const [newIngredient, setNewIngredient] = useState<Omit<Item, 'item_id'>>({
        ingredient_id: 0,
        inventory_id: 0,
        item_quantity: 0,
        expiration_date: '',
        purchase_date: '',
        mfg: '',
        item_name: ''
    });

    useEffect(() => {
        const fetchUserIngredients = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const data = await fetchIngredients(user.id);
                setIngredients(data);
            }
        };

        fetchUserIngredients();
    }, []);

    const handleAddIngredient = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const ingredient = {
                ...newIngredient,
                user_id: user.id,
                inventory_id: parseInt(newIngredient.inventory_id as unknown as string),
                item_quantity: parseInt(newIngredient.item_quantity as unknown as string)
            };

            const data = await addIngredient(ingredient);
            if (data) {
                setIngredients([...ingredients, ...data]);
                setNewIngredient({
                    ingredient_id: 0,
                    inventory_id: 0,
                    item_quantity: 0,
                    expiration_date: '',
                    purchase_date: '',
                    mfg: '',
                    item_name: ''
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ingredients}
                keyExtractor={(item) => item.item_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.ingredientItem}>
                        <Text>{item.item_name} - {item.item_quantity} - {item.expiration_date}</Text>
                    </View>
                )}
            />
            <View style={styles.addIngredientContainer}>
                <TextInput
                    placeholder="Ingredient ID"
                    value={newIngredient.ingredient_id.toString()}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, ingredient_id: parseInt(text) })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Inventory ID"
                    value={newIngredient.inventory_id.toString()}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, inventory_id: parseInt(text) })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Quantity"
                    value={newIngredient.item_quantity.toString()}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, item_quantity: parseInt(text) })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Expiration Date"
                    value={newIngredient.expiration_date}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, expiration_date: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Purchase Date"
                    value={newIngredient.purchase_date}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, purchase_date: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Manufacturing Date"
                    value={newIngredient.mfg}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, mfg: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Item Name"
                    value={newIngredient.item_name}
                    onChangeText={(text) => setNewIngredient({ ...newIngredient, item_name: text })}
                    style={styles.input}
                />
                <Button title="Add Ingredient" onPress={handleAddIngredient} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    ingredientItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    addIngredientContainer: {
        marginTop: 16
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 8,
        padding: 8
    }
});

export default InventoryScreen;