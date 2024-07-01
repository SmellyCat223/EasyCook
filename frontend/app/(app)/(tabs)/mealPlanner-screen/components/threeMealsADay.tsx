import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { MealPlan, Meal, Recipe } from '../types';

interface DayProps {
    day: string;
    bfastTitle?: string;
    lunchTitle?: string;
    dinnerTitle?: string;
}

const Day: React.FC<DayProps> = ({ day, bfastTitle, lunchTitle, dinnerTitle }) => {
    return (
        <View className="m-2 p-4 bg-green-200 shadow rounded-lg">
            <View className="mb-2 border-b pb-2">
                <Text className="text-lg font-semibold">{day} </Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Breakfast: {bfastTitle}</Text>
                <View className="flex-row items-center">
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Lunch: {lunchTitle}</Text>
                <View className="flex-row items-center">
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Dinner: {dinnerTitle}</Text>
                <View className="flex-row items-center">
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
        </View>
    );
};

interface MealPlannerScreenComponentProps {
    mealPlan: MealPlan;
}

const MealPlannerScreenComponent: React.FC<MealPlannerScreenComponentProps> = ({ mealPlan }) => {
    console.log('Meal Planner Component Rendered with Meal Plan:', mealPlan);
    return (
        <ScrollView>
            {Object.keys(mealPlan).map((day) => (
                <Day
                    key={day}
                    day={day}
                    bfastTitle={mealPlan[day as keyof MealPlan].Breakfast?.strMeal || 'No Breakfast'}
                    lunchTitle={mealPlan[day as keyof MealPlan].Lunch?.strMeal || 'No Lunch'}
                    dinnerTitle={mealPlan[day as keyof MealPlan].Dinner?.strMeal || 'No Dinner'}
                />
            ))}
        </ScrollView>
    );
};

export default MealPlannerScreenComponent;