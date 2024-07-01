import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const Stats = () => {
    let wastage = "1";
    const showAlert = () => {
        alert('Feature coming soon!');
    };

    return (
        <TouchableOpacity onPress={showAlert}>
            <View className="py-1">
                <View className="rounded-2xl p-4 bg-yellow-100">
                    <Text>Food Wastage</Text>
                    <View className="flex flex-row justify-between">
                        <Text className="text-xl">You are doing great!</Text>
                        <Text className="text-2xl">{wastage}%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Stats;