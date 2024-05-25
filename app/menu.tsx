import React from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';

const Menu = () => {
    return (
        <View className="flex-1 p-4 bg-stone-950">
            <Text className="text-base text-zinc-100">This is menu page</Text>
            <Cat />
        </View>
    );
};

const Cat = () => {
    return (
        <Image source = {{
            uri: "https://i.pinimg.com/originals/af/64/49/af6449c9ece35104f7e351c0c6f8c132.jpg",
        }}
        style={{ width: 200, height: 250 }}
        />
    );
};

export default Menu;