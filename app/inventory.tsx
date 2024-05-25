import React from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';

const Inventory = () => {
    return (
        <View className="flex-1 p-4 bg-stone-950">
            <Text className="text-base text-zinc-100">This is inventory page</Text>
            <Filter />
            <Body />
        </View>
    )
}

const Filter = () => {
    return (
        <View className="flex flex-row pt-3 pb-3 justify-between">
            <View className="flex flex-row rounded-2xl p-2 w-4/5 bg-zinc-200">
                <Icon name="search1" type="antdesign" color="#6b7280" size = {16}/>
                <Text className="text-zinc-500">  Search Item</Text>
            </View>
            <Text className="text-yellow-500">Filter</Text>
        </View>
    );
};

const Body = () => {
    let food1 = "fish";
    let amount1 = "100g";

    return (
        <View>
            <View className="flex flex-row justify-between">
                <View className="flex flex-row w-1/4 justify-between">
                    <Text className="text-yellow-500">check</Text>
                    <Text className="text-base text-zinc-100">{food1}</Text>
                </View>
                <Text className="text-base text-zinc-100">{amount1}</Text>
            </View>
        </View>
    )
}

export default Inventory;