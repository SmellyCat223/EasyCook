import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
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