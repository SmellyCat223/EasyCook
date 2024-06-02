import React from 'react';
import { Text, View, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';

const meals = [ // to link to database later on
    {
        day: "Mon",
        date: "20/05",
        bfastTitle: "Oats with berries",
        bfastCal: "165kcal",
        lunchTitle: "Grilled Chicken",
        lunchCal: "245kcal",
        dinnerTitle: "ChaShu Ramen",
        dinnerCal: "375kcal"
    },

    {
        day: "Tues",
        date: "21/05",
        bfastTitle: "Avocado Toast",
        bfastCal: "5kcal",
        lunchTitle: "Turkey and Avocado Wrap",
        lunchCal: "5kcal",
        dinnerTitle: "Spaghetti Bolognese",
        dinnerCal: "5kcal"
    },

    {
        day: "Wed",
        date: "22/05",
        bfastTitle: "Blueberry Pancakes",
        bfastCal: "105kcal",
        lunchTitle: "Grilled Vegetable Panini",
        lunchCal: "205kcal",
        dinnerTitle: "Lemon Herb Chicken",
        dinnerCal: "305kcal"
    },

    {
        day: "Thurs",
        date: "23/05",
        bfastTitle: "Greek Yogurt Parfait",
        bfastCal: "16kcal",
        lunchTitle: "Tomato Basil Soup",
        lunchCal: "24kcal",
        dinnerTitle: "Stir-Fry with Vegetables",
        dinnerCal: "37kcal"
    },

    {
        day: "Fri",
        date: "24/05",
        bfastTitle: "Veggie Omelette",
        bfastCal: "65kcal",
        lunchTitle: "Quinoa Salad",
        lunchCal: "45kcal",
        dinnerTitle: "Grilled Salmon",
        dinnerCal: "75kcal"
    },

    {
        day: "Sat",
        date: "25/05",
        bfastTitle: "Breakfast Burrito",
        bfastCal: "15kcal",
        lunchTitle: "Caprese Sandwich",
        lunchCal: "25kcal",
        dinnerTitle: "Vegetarian Chili",
        dinnerCal: "35kcal"
    },

    {
        day: "Sun",
        date: "26/05",
        bfastTitle: "Acai Bowl",
        bfastCal: "100kcal",
        lunchTitle: "Chicken Caesar Salad",
        lunchCal: "200kcal",
        dinnerTitle: "Shrimp Scampi",
        dinnerCal: "300kcal"
    },
];

const Day: React.FC<{
    day: string;
    date: string;
    bfastTitle: string;
    bfastCal: string;
    lunchTitle: string;
    lunchCal: string;
    dinnerTitle: string;
    dinnerCal: string;
}> = ({ day, date, bfastTitle, bfastCal, lunchTitle, lunchCal, dinnerTitle, dinnerCal }) => {
    return (
        <View className="m-2 p-4 bg-green-200 shadow rounded-lg">
            <View className="mb-2 border-b pb-2">
                <Text className="text-lg font-semibold">{day} {date}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Breakfast: {bfastTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{bfastCal}</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Lunch: {lunchTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{lunchCal}</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Dinner: {dinnerTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{dinnerCal}</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const MealPlannerScreenComponent = () => {
    return (
        <ScrollView>
            {meals.map((meal, index) => (
                <Day
                    key={index}
                    day={meal.day}
                    date={meal.date}
                    bfastTitle={meal.bfastTitle}
                    bfastCal={meal.bfastCal}
                    lunchTitle={meal.lunchTitle}
                    lunchCal={meal.lunchCal}
                    dinnerTitle={meal.dinnerTitle}
                    dinnerCal={meal.dinnerCal}
                />
            ))}
        </ScrollView>
    );
};

export default MealPlannerScreenComponent;
