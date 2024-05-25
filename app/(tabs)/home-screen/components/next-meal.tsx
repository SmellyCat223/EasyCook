import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const NextMeal = () => {
    let date = "07 Tue";
    let meal = "Lunch Menu";
    let food1 = "Grilled Chicken";
    let food2 = "Pesto Pasta";
    let food3 = "Greek Yoghurt";
    let calories = 600

    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-green-200">
                <View className="flex flex-row pb-2 justify-between">
                    <View className="flex flex-row">
                        <Icon name="calendar" type="antdesign" size={18} />
                        <Text className="pl-2 text-zinc-500">{date}</Text>
                    </View>
                    <Icon name="edit" type="antdesign" size={20} />
                </View>
                <Text>{meal}</Text>
                <View className="flex flex-row justify-between">
                    <View>
                        <Text className="text-xl">{food1}</Text>
                        <Text className="text-xl">{food2}</Text>
                        <Text className="text-xl">{food3}</Text>
                    </View>
                    <View className="h-2/5 p-2 bg-zinc-50 rounded-2xl">
                        <Text>{calories} kcal</Text>
                    </View>
                </View>

            </View>
        </View>
    );
};

export default NextMeal;