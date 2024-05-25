import React, { useState } from 'react';
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
            <Link href="./menu">
                <Icon name="menu" type="feather" color="#f4f4f5" />
            </Link>
        </View>
    );
};

export default Header;