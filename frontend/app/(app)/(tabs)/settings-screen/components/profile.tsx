import React from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import ProfilePicture from '../../../../components/profile-picture';

const Profile = () => {
    return (
        <View className="flex-1 p-4 bg-stone-950">
            <ProfilePicture />
        </View>
    );
};

export default Profile;