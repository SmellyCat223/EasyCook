import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const Article = () => {
    let article = "5 ways to eat healthy";

    return (
        <View className="py-1">
            <View className="rounded-2xl p-4 bg-gray-50">
                <Text>Article of the day</Text>
                <Text className="text-xl">{article}</Text>
            </View>
        </View>
    );
};

export default Article;