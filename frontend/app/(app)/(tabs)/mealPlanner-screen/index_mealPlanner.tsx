/*import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import Header from "./components/headerDate";
import MealPlannerScreenComponent from "./components/threeMealsADay";

const MealPlannerScreen = () => {
    return (
        <View className="flex-1 pt-1 bg-stone-950">
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Header />
                    <MealPlannerScreenComponent />
                </View>
            </ScrollView>
        </View>
    );
};

export default MealPlannerScreen;
*/

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Header from './components/headerDate';
import MealPlannerScreenComponent from './components/threeMealsADay';
import { MealPlan, Meal, Recipe } from './types';

const MealPlannerScreen = () => {
    const [mealPlan, setMealPlan] = useState<MealPlan>({
        Mon: { Breakfast: null, Lunch: null, Dinner: null },
        Tues: { Breakfast: null, Lunch: null, Dinner: null },
        Wed: { Breakfast: null, Lunch: null, Dinner: null },
        Thurs: { Breakfast: null, Lunch: null, Dinner: null },
        Fri: { Breakfast: null, Lunch: null, Dinner: null },
        Sat: { Breakfast: null, Lunch: null, Dinner: null },
        Sun: { Breakfast: null, Lunch: null, Dinner: null },
    });

    const addRecipeToMeal = (day: keyof MealPlan, meal: keyof Meal, recipe: Recipe) => {
        console.log(`Meal Plan Screen: Adding recipe to ${day} ${meal}:`, recipe);
        setMealPlan(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [meal]: recipe
            }
        }));
        console.log('Updated meal plan:', mealPlan);
    };

    return (
        <View className="flex-1 pt-1 bg-stone-950">
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Header />
                    <MealPlannerScreenComponent mealPlan={mealPlan} />
                </View>
            </ScrollView>
        </View>
    );
};

export default MealPlannerScreen;
