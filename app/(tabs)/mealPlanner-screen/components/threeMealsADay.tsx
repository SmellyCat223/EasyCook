import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

const meals = [
    {
        day: "Mon",
        date: "20/05",
        bfastTitle: "Oats with berries",
        bfastCal: "165kcal",
        lunchTitle: "Grilled Chicken",
        lunchCal: "245kcal",
        dinnerTitle: "ChaShu Ramen",
        dinnerCal: "375kcal",
    },
    {
        day: "Tues",
        date: "21/05",
        bfastTitle: "Avocado Toast",
        bfastCal: "5kcal",
        lunchTitle: "Turkey and Avocado Wrap",
        lunchCal: "5kcal",
        dinnerTitle: "Spaghetti Bolognese",
        dinnerCal: "5kcal",
    },
    {
        day: "Wed",
        date: "22/05",
        bfastTitle: "Blueberry Pancakes",
        bfastCal: "105kcal",
        lunchTitle: "Grilled Vegetable Panini",
        lunchCal: "205kcal",
        dinnerTitle: "Lemon Herb Chicken",
        dinnerCal: "305kcal",
    },
    {
        day: "Thurs",
        date: "23/05",
        bfastTitle: "Greek Yogurt Parfait",
        bfastCal: "16kcal",
        lunchTitle: "Tomato Basil Soup",
        lunchCal: "24kcal",
        dinnerTitle: "Stir-Fry with Vegetables",
        dinnerCal: "37kcal",
    },
    {
        day: "Fri",
        date: "24/05",
        bfastTitle: "Veggie Omelette",
        bfastCal: "65kcal",
        lunchTitle: "Quinoa Salad",
        lunchCal: "45kcal",
        dinnerTitle: "Grilled Salmon",
        dinnerCal: "75kcal",
    },
    {
        day: "Sat",
        date: "25/05",
        bfastTitle: "Breakfast Burrito",
        bfastCal: "15kcal",
        lunchTitle: "Caprese Sandwich",
        lunchCal: "25kcal",
        dinnerTitle: "Vegetarian Chili",
        dinnerCal: "35kcal",
    },
    {
        day: "Sun",
        date: "26/05",
        bfastTitle: "Acai Bowl",
        bfastCal: "100kcal",
        lunchTitle: "Chicken Caesar Salad",
        lunchCal: "200kcal",
        dinnerTitle: "Shrimp Scampi",
        dinnerCal: "300kcal",
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
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.dayContainer}>
                    <View style={styles.dayDateContainer}>
                        <Text>{day} {date}</Text>
                    </View>
                    <View style={styles.mealContainer}>
                        <Text>Breakfast : {bfastTitle}</Text>
                        <View style={styles.caloriesContainer}>
                            <Text>{bfastCal}</Text>
                            <View style={styles.iconRow}>
                                <Icon name="edit" type="antdesign" size={15} style={styles.icon} />
                                <Icon name="delete" type="material" size={15} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.mealContainer}>
                        <Text>Lunch : {lunchTitle}</Text>
                        <View style={styles.caloriesContainer}>
                            <Text>{lunchCal}</Text>
                            <View style={styles.iconRow}>
                                <Icon name="edit" type="antdesign" size={15} style={styles.icon} />
                                <Icon name="delete" type="material" size={15} style={styles.icon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.mealContainer}>
                        <Text>Dinner : {dinnerTitle}</Text>
                        <View style={styles.caloriesContainer}>
                            <Text>{dinnerCal}</Text>
                            <View style={styles.iconRow}>
                                <Icon name="edit" type="antdesign" size={15} style={styles.icon} />
                                <Icon name="delete" type="material" size={15} style={styles.icon} />
                            </View>
                        </View>
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

const styles = StyleSheet.create({
    container: {
        padding: 3,
    },
    innerContainer: {
        padding: 8,
        backgroundColor: 'rgba(253, 243, 217, 0.8)',
    },
    dayContainer: {
        padding: 8,
    },
    dayDateContainer: {
        marginBottom: 5,
        borderBottomWidth: 1,
    },
    mealContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        marginLeft: 8,
    },
    caloriesContainer: {
        flexDirection: 'row',
    },
});

export default MealPlannerScreenComponent;
