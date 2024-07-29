import React, { useState, useEffect } from 'react';
import { View, Alert, Button } from "react-native";
import { supabase } from '../../../../supabase';
import { Item, Recipe, Meal, Ingredient, RecipeIngredient } from '../../../../types'; // Make sure these types are correctly defined
import { useFocusEffect } from '@react-navigation/native';

const AutogenerateGrocery: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [shoppingListId, setShoppingListId] = useState<string | null>(null);
    const [inventoryId, setInventoryId] = useState<string | null>(null);
    const [inventory, setInventory] = useState<Ingredient[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    // const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [items, setItems] = useState<Item[]>([]);

    const handlePress = async () => {
        const fetchData = async () => {
            try {
                await fetchUserId();
                await fetchShoppingListId();
                await fetchInventoryId();
                await fetchMeals();
                await fetchRecipes();
                await fetchRecipeIngredients();
                await fetchIngredients();
                await fetchItems();

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
                                    user_id: userId
                                }]);

                            if (error) {
                                Alert.alert('Error', error.message);
                            } else {
                                console.log('Success');
                            }
                        }
                    }
                }

                console.log('Grocery list has been updated');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        fetchData();
    };

    const fetchUserId = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Error fetching user session:', error);
        } else if (data?.session) {
            setUserId(data.session.user.id);
            console.log(`User id: ${data.session.user.id}`);
        }
    };

    const fetchShoppingListId = async () => {
        const { data, error } = await supabase
            .from('shopping_list')
            .select('shopping_list_id')
            .eq('user_id', userId)
            .single();
        if (error) {
            console.error('Error fetching shopping list:', error);
        } else {
            setShoppingListId(data.shopping_list_id);
            console.log(`Shopping list id: ${data.shopping_list_id}`);
        }
    };

    const fetchInventoryId = async () => {
        const { data: inventoryData, error: inventoryError } = await supabase
            .from('inventory')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (inventoryError) {
            console.error('Error fetching inventory:', inventoryError);
        } else {
            setInventory(inventoryData);
            console.log(`Inventory: ${inventoryData.inventory_id}`);
        }
    };

    // Fetch meals for the current week
    const fetchMeals = async () => {
        const { data: mealsData, error: mealsError } = await supabase
            .from('meal')
            .select('*')
            .eq('user_id', userId)
            .gte('meal_date', getStartOfWeek())
            .lte('meal_date', getEndOfWeek());
        if (mealsError) {
            console.error('Error fetching meals:', mealsError);
        } else {
            setMeals(mealsData);
            console.log(`Meals: ${mealsData.map(meal => meal.meal_title)}`);
        }
    }

    // Fetch recipes from meals
    const fetchRecipes = async () => {
        const recipeTitle = meals.map(meal => meal.meal_title);
        const { data: recipeData, error: recipeError } = await supabase
            .from('recipe')
            .select('*')
            .in('recipe_name', recipeTitle);
        if (recipeError) {
            console.error('Error fetching recipe:', recipeError);
        } else {
            setRecipes(recipeData);
            console.log(`Recipes: ${recipeData.map(recipe => recipe.recipe_id)}`);
        }
    };

    // Fetch recipe ingredients
    const fetchRecipeIngredients = async () => {
        const recipeIds = recipes.map(recipe => recipe.recipe_id);
        const { data: recipeIngredientData, error: recipeIngredientError } = await supabase
            .from('recipe_ingredient')
            .select('*')
            .in('recipe_id', recipeIds);
        if (recipeIngredientError) {
            console.error('Error fetching recipe ingredients:', recipeIngredientError);
        } else {
            setRecipeIngredients(recipeIngredientData);
            console.log(`Recipe ingredients: ${recipeIngredientData.map(ingredient => [ingredient.ingredient_id, ingredient.ingredient_quantity])}`);
        }
    }

    // Fetch ingredients
    const fetchIngredients = async () => {
        const ingredientIds = recipeIngredients.map(ingredient => ingredient.ingredient_id);
        const { data: ingredientData, error: ingredientError } = await supabase
            .from('ingredient')
            .select('*')
            .in('ingredient_id', ingredientIds);
        if (ingredientError) {
            console.error('Error fetching ingredients:', ingredientError);
        } else {
            setIngredients(ingredientData);
            console.log(`Ingredients: ${ingredientData.map(ingredient => ingredient.ingredient_quantity)}`);
        }
    }

    // Fetch inventory items
    const fetchItems = async () => {
        const ingredientNames = ingredients.map(ingredient => ingredient.ingredient_name);
        const { data: itemsData, error: itemsError } = await supabase
            .from('item')
            .select('*')
            .in('item_name', ingredientNames);
        if (itemsError) {
            console.error('Error fetching items:', itemsError);
        } else {
            setItems(itemsData);
            console.log(`items: ${itemsData.map(item => [item.item_name, item.item_quantity])}`);
        }
    }

    const getStartOfWeek = (): string => {
        const now = new Date();
        const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        firstDayOfWeek.setHours(0, 0, 0, 0);
        console.log(`Start week: `, firstDayOfWeek);
        return firstDayOfWeek.toISOString();
    };

    const getEndOfWeek = (): string => {
        const now = new Date();
        const lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        lastDayOfWeek.setHours(23, 59, 59, 999);
        console.log(`End week: `, lastDayOfWeek);
        return lastDayOfWeek.toISOString();
    };

    return (
        <Button title="Autogenerate Grocery List" onPress={handlePress} />
    );
}

export default AutogenerateGrocery;
