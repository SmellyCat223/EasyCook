import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Home from "./home-screen/index";

const Index = () => {
    return (
        <View className="flex-1 pt-10 bg-stone-950">
            <Home />
        </View>
    );
};

export default Index;