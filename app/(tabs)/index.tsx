import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
    return (
        <View className="flex-1 pt-10 bg-stone-950">
            <Header />
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Recipe />
                    <UpdateInventory />
                    <NextMeal />
                    <Expiring />
                    <GroupReq />
                    <Article />
                    <Stats />
                </View>
            </ScrollView>
        </View>
    );
};

const Header = () => {
    let name = "Linh";

    return (
        <View className="flex flex-row justify-between p-4">
            <View>
                <View className="flex flex-row">
                    <Text className="text-zinc-100">Hi {name} </Text>
                    <Icon name="waving-hand" type="materialicons" color="#fef08a" size = {16} />
                </View>
                <Text className="text-zinc-100">Welcome back!</Text>
            </View>
            <Link href="./menu">
                <Icon name="menu" type="feather" color="#f4f4f5" />
            </Link>
        </View>
    );
};

const Recipe = () => {
    return (
        <View className="py-1">
            <View className="flex flex-row rounded-2xl p-2 bg-zinc-200">
                <Icon name="search1" type="antdesign" color="#6b7280" size = {16}/>
                <Text className="text-zinc-500">  Search Recipe</Text>
            </View>
        </View>
    );
};

const UpdateInventory = () => {
    return (
        <View className="py-1">
            <View className="flex flex-row justify-between bg-zinc-200 rounded-2xl p-4">
                <View>
                    <Text className="text-base">Just bought something?</Text>
                    <Text className="text-zinc-500">Update your inventory!</Text>
                </View>
                <Icon name="pluscircleo" type="antdesign" size={30} color="#71717a" />
            </View>
        </View>
    );
};

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


const Expiring = () => {
    let food1 = "Milk";
    let exp1 = "2 days";
    let food2 = "Eggs";
    let exp2 = "3 days";
    let food3 = "Ice Cream";
    let exp3 = "5 days";

    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-sky-200">
                <View className="flex flex-row justify-between">
                    <Icon name="clockcircleo" type="antdesign" size={18} />
                    <View className="flex flex-row justify-between p-1 rounded-2xl bg-zinc-800">
                        <View className="px-2 py-1 rounded-xl bg-sky-200">
                            <Text>Weekly</Text>
                        </View>
                        <View className="px-2 py-1 rounded-xl">
                            <Text className="text-sky-200">Monthly</Text>
                        </View>
                    </View>
                </View>
                <View className="pt-2">
                    <View className="w-3/5">
                        <Text>Expiring soon</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-xl">{food1}</Text>
                        <Text className="text-xl">{exp1}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-xl">{food2}</Text>
                        <Text className="text-xl">{exp2}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-xl">{food3}</Text>
                        <Text className="text-xl">{exp3}</Text>
                    </View>
                    <Text className="text-zinc-500">More...</Text>
                </View>
            </View>
        </View>

    );
};

const GroupReq = () => {
    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-violet-200">
                <View className="flex flex-row justify-between pb-2">
                    <Icon name="group" type="fontawesome" size={18} />
                    <View className="flex flex-row justify-between">
                        <View className="p-1">
                            <Icon name="closecircleo" type="antdesign" size={30} />
                        </View>
                        <View className="p-1">
                            <Icon name="checkcircle" type="antdesign" size={30} />
                        </View>
                    </View>
                </View>
                <Text>Group Order Request</Text>
                <Text className="text-xl">4 people nearby want to group order with you!</Text>
            </View>
        </View>
    );
};

const Article = () => {
    let article = "5 ways to eat healthy";

    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-gray-50">
                <Text>Article of the day</Text>
                <Text className="text-xl">{article}</Text>
            </View>
        </View>
    );
};

const Stats = () => {
    let wastage = "1";

    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-yellow-100">
                <Text>Food Wastage</Text>
                <View className="flex flex-row justify-between">
                    <Text className="text-xl">You are doing great!</Text>
                    <Text className="text-2xl">{wastage}%</Text>
                </View>
            </View>
        </View>
    );
};
