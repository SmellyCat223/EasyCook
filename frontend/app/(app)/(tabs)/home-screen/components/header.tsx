import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useUser } from '../../../../UserContext';

const Header = ({ username }: { username: string | null }) => {

    return (
        <View className="flex flex-row justify-between p-4">
            <View>
                <View className="flex flex-row">
                    <Text className="text-zinc-100">Hi {username} </Text>
                    <Icon name="waving-hand" type="materialicons" color="#fef08a" size={16} />
                </View>
                <Text className="text-zinc-100">Welcome back!</Text>
            </View>
        </View>
    );
};

export default Header;
