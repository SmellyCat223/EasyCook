import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const Header = () => {
    return (
        <View className="flex flex-row justify-center items-center">
            <Text className="text-gray-100 text-xl font-bold">20 May ~ 26 May</Text>
        </View>
    );
};

export default Header;
