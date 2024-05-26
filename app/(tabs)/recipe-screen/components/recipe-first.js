import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const RecipeA = () => { // to edit
    return (
        <View className="py-1">
            <View className="flex flex-row rounded-2xl p-2 bg-zinc-200">
                <Icon name="search1" type="antdesign" color="#6b7280" size = {16}/>
                <Text className="text-zinc-500">  Search Recipe</Text>
            </View>
        </View>
    );
};

export default Search;