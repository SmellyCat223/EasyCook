import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { Icon } from 'react-native-elements';

const Search = () => {
    return (
        <View className="py-1">
            <Link href="/recipe" asChild>
                <TouchableOpacity className="flex flex-row rounded-2xl p-2 bg-zinc-200" style={{alignItems: 'center'}}>
                    <View><Icon name="search" size={24} color="#9CA3AF" style={{ marginRight: 3 }} /></View>
                    <Text className="text-zinc-500" style={{fontSize:15}}>
                        What are you craving today?
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default Search;

