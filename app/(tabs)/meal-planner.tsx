import React from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import MealPlannerScreen from './mealPlanner-screen';

const MealPlanner = () => {
    return (
        <View className="flex-1 bg-stone-950">
            <MealPlannerScreen />
        </View>
    );
}

export default MealPlanner;