import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const UpdateInventory = () => {
    return (
        <Link href="../../settings-screen/components/add-item" asChild>
            <TouchableOpacity>
                <View className="py-1">
                    <View className="flex flex-row justify-between bg-zinc-200 rounded-2xl p-4">
                        <View>
                            <Text className="text-base">Just bought something?</Text>
                            <Text className="text-zinc-500">Update your inventory!</Text>
                        </View>
                        <Icon name="pluscircleo" type="antdesign" size={30} color="#71717a" />
                    </View>
                </View>
            </TouchableOpacity>

        </Link>
    );
};

export default UpdateInventory;