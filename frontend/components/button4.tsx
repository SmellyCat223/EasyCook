import React from 'react';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity, Text, View } from "react-native";

type Button4Props = {
    text1: string;
    text2: string;
    pred: string | undefined;
    isChecked: boolean; // New prop for checkbox state
    onPress1: () => void;
    onPress2: (path: string) => void;
};

const Button4 = ({ text1, text2, pred, isChecked, onPress1, onPress2 }: Button4Props) => {
    // Handle the checkbox press event
    const handleCheckboxPress = () => {
        onPress1(); // Notify parent of checkbox change
    };

    return (
        <View className="flex flex-row items-center border-b border-t border-zinc-800 bg-zinc-800/70 pl-4">
            <Checkbox
                value={isChecked}
                onValueChange={handleCheckboxPress}
                color={isChecked ? "#a1a1aa" : undefined}
            />
            <TouchableOpacity
                onPress={() => onPress2("")}
                className="flex flex-1 justify-center h-10"
            >
                <View className="flex flex-row justify-between px-2">
                    <View className="flex flex-row w-4/5">
                        <Text className="text-base text-white">   {text1}</Text>
                    </View>
                    <View className="text-left pr-4">
                        <Text className="text-base text-white">{text2}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Button4;
