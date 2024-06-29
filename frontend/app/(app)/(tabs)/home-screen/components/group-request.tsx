import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const GroupReq = () => {
    const showAlert = () => {
        alert('Feature coming soon!');
    };

    return (
        <TouchableOpacity onPress={showAlert}>
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
        </TouchableOpacity>
    );
};

export default GroupReq;