/*import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

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
        </View >
    );
};

export default Header;

*/

import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Header = ({ username }: { username: string | null }) => {
    return (
        <View className="flex flex-row justify-between p-4">
            <View>
                <View className="flex flex-row">
                    <Text className="text-zinc-100">Hi {username} </Text>
                    <Icon name="waving-hand" type="materialicons" color="#fef08a" size={16} />
                </View>
                <Text className="text-zinc-100">Welcome back!</Text>
            </View>
        </View>
    );
};

export default Header;
