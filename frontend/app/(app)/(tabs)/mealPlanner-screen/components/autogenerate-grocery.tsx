import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from '../../../../supabase';
import { Item, Recipe, Meal, Ingredient, RecipeIngredient } from '../../../../types'; // Ensure these types are correctly defined

const AutogenerateGrocery: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [inventory, setInventory] = useState<Ingredient[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;
                if (data?.session?.user?.id) {
                    setUserId(data.session.user.id);
                } else {
                    throw new Error('User session or user ID not found');
                }
            } catch (error) {
                console.error('Error fetching user session:', error);
                Alert.alert('Error', error.message);
            }
        };

        const fetchData = async () => {
            if (!userId) return;

            try {
                // Fetch shopping list ID and inventory ID
                const { data: shoppingListData, error: shoppingListError } = await supabase
                    .from('shopping_list')
                    .select('shopping_list_id')
                    .eq('user_id', userId)
                    .single();
                if (shoppingListError) throw shoppingListError;
                if (shoppingListData) {
                    setShoppingListId(shoppingListData.shopping_list_id);
                } else {
                    throw new Error('Shopping list not found');
                }

                const { data: inventoryData, error: inventoryError } = await supabase
                    .from('inventory')
                    .select('*')
                    .eq('user_id', userId)
                    .single();
                if (inventoryError) throw inventoryError;
                if (inventoryData) {
                    setInventoryId(inventoryData.inventory_id);
                } else {
                    throw new Error('Inventory not found');
                }

                // Fetch meals
                const { data: mealsData, error: mealsError } = await supabase
                    .from('meal')
                    .select('*')
                    .eq('user_id', userId)
                    .gte('meal_date', getStartOfWeek())
                    .lte('meal_date', getEndOfWeek());
                if (mealsError) throw mealsError;
                setMeals(mealsData);

                // Fetch recipes
                const recipeTitle = mealsData.map(meal => meal.meal_title);
                const { data: recipeData, error: recipeError } = await supabase
                    .from('recipe')
                    .select('*')
                    .in('recipe_name', recipeTitle);
                if (recipeError) throw recipeError;
                setRecipes(recipeData);

                // Fetch recipe ingredients
                const recipeIds = recipeData.map(recipe => recipe.recipe_id);
                const { data: recipeIngredientData, error: recipeIngredientError } = await supabase
                    .from('recipe_ingredient')
                    .select('*')
                    .in('recipe_id', recipeIds);
                if (recipeIngredientError) throw recipeIngredientError;
                setRecipeIngredients(recipeIngredientData);

                // Fetch ingredients
                const ingredientIds = recipeIngredientData.map(ingredient => ingredient.ingredient_id);
                const { data: ingredientData, error: ingredientError } = await supabase
                    .from('ingredient')
                    .select('*')
                    .in('ingredient_id', ingredientIds);
                if (ingredientError) throw ingredientError;
                setIngredients(ingredientData);

                // Fetch items
                const ingredientNames = ingredientData.map(ingredient => ingredient.ingredient_name);
                const { data: itemsData, error: itemsError } = await supabase
                    .from('item')
                    .select('*')
                    .gte('expiration_date', new Date().toISOString() || null)
                    .in('item_name', ingredientNames);
                if (itemsError) throw itemsError;
                setItems(itemsData);

                setIsDataFetched(true);
            } catch (error) {
                console.error('Error in fetchData:', error);
                Alert.alert('Error', error.message);
            }
        };

        fetchUserId().then(() => {
            if (userId) {
                fetchData();
            }
        });
    }, [userId]); // Runs when userId is set

    const getStartOfWeek = (): string => {
        const now = new Date();
        const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        firstDayOfWeek.setHours(0, 0, 0, 0);
        return firstDayOfWeek.toISOString();
    };

    const getEndOfWeek = (): string => {
        const now = new Date();
        const lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        lastDayOfWeek.setHours(23, 59, 59, 999);
        return lastDayOfWeek.toISOString();
    };

    const handlePress = async () => {
        setLoading(true);
        try {
            if (!userId || !shoppingListId || !isDataFetched) {
                throw new Error('User ID, Shopping List ID, or data not set. Press Create Grocery list button once again.');
            }

            // Compare ingredients and update grocery list
            const inventoryMap = new Map(items.map(item => [item.item_name, item]));

            for (const recipeIngredient of recipeIngredients) {
                const ingredient = ingredients.find(ingredient => ingredient.ingredient_id === recipeIngredient.ingredient_id);
                if (ingredient) {
                    const inventoryItem = inventoryMap.get(ingredient.ingredient_name);

                    if (!inventoryItem || inventoryItem.item_quantity < recipeIngredient.ingredient_quantity) {
                        const requiredQuantity = inventoryItem
                            ? recipeIngredient.ingredient_quantity - inventoryItem.item_quantity
                            : recipeIngredient.ingredient_quantity;

                        const { error } = await supabase
                            .from('item')
                            .insert([{
                                item_name: ingredient.ingredient_name,
                                ingredient_id: ingredient.ingredient_id,
                                item_shopping_list_id: shoppingListId,
                                item_quantity: requiredQuantity,
                                measurement_unit: recipeIngredient.measurement_unit,
                                user_id: userId
                            }]);

                        if (error) {
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            }

            Alert.alert('Success', 'Grocery list has been autogenerated!');
        } catch (error) {
            console.error('Error in handlePress:', error);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false); // Hide activity indicator
        }
    };

    return (
        <View >
            {loading ? (
                <ActivityIndicator size="large" color="#F5D5A1" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Generate Grocery List</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#d1fae5',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
    },
});


export default AutogenerateGrocery;
