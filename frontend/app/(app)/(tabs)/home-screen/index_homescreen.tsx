/*import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Header from "./components/header";
import Search from "./components/search";
import UpdateInventory from "./components/update-inventory";
import NextMeal from "./components/next-meal";
import Expiring from "./components/expiring";
import GroupReq from "./components/group-request";
import Article from "./components/article";
import Stats from "./components/stats";

const Home = () => {
    return (
        <View className="flex-1 pt-10 bg-stone-950">
            <Header />
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Search />
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

export default Home;
*/

import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from "./components/header";
import Search from "./components/search";
import UpdateInventory from "./components/update-inventory";
import NextMeal from "./components/next-meal";
import Expiring from "./components/expiring";
import GroupReq from "./components/group-request";
import Article from "./components/article";
import Stats from "./components/stats";
import { useUser } from '../../../UserContext';

const Home = () => {
    const { username } = useUser();
    console.log('Index Home screen username:', username);

    return (
        <View className="flex-1 pt-10 bg-stone-950">
            <Header username={username} />
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Search />
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

export default Home;
