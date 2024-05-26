import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';

const Header = () => {
    return (
        <View className="flex flex-row justify-between p-4">
            <View>
                <Text className="text-zinc-100"> My Recipe </Text>
            </View>
        </View>
    );
};

export default Header;