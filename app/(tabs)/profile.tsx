import React from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';

const Profile = () => {
    return (
        <View className="flex-1 p-4 bg-stone-950">
            <Text className="text-base text-zinc-100">This is profile page</Text>
            <ProfilePic />
        </View>
    );
};

const ProfilePic = () => {
    return (
        <Image source = {{
            uri: "https://preview.redd.it/vton9zwqv3f61.jpg?width=1080&crop=smart&auto=webp&s=fc711e57946cbb8667543f22de47143e43198154",
        }}
        style={{ width: 200, height: 250 }}
        />
    );
};

export default Profile;