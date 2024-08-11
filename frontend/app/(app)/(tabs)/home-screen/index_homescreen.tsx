import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from "./components/header";
import Search from "./components/search";
import UpdateInventory from "./components/update-inventory";
import NextMeal from "./components/next-meal";
import Expiring from "./components/expiring";
import Article from "./components/article";
import { useUser } from '../../../UserContext';

const Home = () => {
    const { username } = useUser();

    return (
        <View className="flex-1 pt-10 bg-stone-950">
            <Header username={username} />
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Search />
                    <UpdateInventory />
                    <NextMeal />
                    <Expiring />
                    <Article />
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
