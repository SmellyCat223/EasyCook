import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Search from "./components/search-bar";
import RecipeA from "./components/recipe-first";

const RecipeScreen = () => {
    return (
        <View className="flex-1 pt-1 bg-stone-950">
            <ScrollView className="flex-grow">
                <View className="px-4 pb-6 bg-stone-950">
                    <Search />
                    <RecipeA />
                </View>
            </ScrollView>
        </View>
    );
};

export default RecipeScreen;