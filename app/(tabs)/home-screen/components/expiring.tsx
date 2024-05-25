import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

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

export default Expiring;