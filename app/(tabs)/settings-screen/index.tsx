import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import Button from '../../components/button';
import Button2 from '../../components/button2';
import ProfilePicture from '../../components/profile-picture';

const Settings = () => {
    const router = useRouter();

    const handlePress = (path: string) => {
        router.push(path);
      };

    return (
        <View className="flex-1 bg-stone-950">
            <ProfilePicture />
            <View className="py-4">
                <Button2 text="Go to my profile" icon1="account-circle" icon2="chevron-right" onPress={() => handlePress("./settings-screen/components/profile")} />
                <Button2 text="Go to inventory" icon1="inventory" icon2="chevron-right" onPress={() => handlePress("./settings-screen/components/inventory")} />
                <Button2 text="Go to light mode" icon1="dark-mode" icon2="chevron-right" onPress={() => console.log("light mode")} />
                <Button2 text="Go to login" icon1="login" icon2="chevron-right" onPress={() => handlePress("./settings-screen/components/login")} />
            </View>
        </View>
    );
};

export default Settings;