import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';

const Search = () => {
    return (
        <View className="py-1">
            <Link href="/recipe-screen/index_recipe" asChild>
                <TouchableOpacity className="flex flex-row rounded-2xl p-2 bg-zinc-200">
                    <Text className="text-zinc-500">What are you craving for?</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default Search;

