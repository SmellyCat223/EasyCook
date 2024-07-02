import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity, Text, View } from "react-native";

type Button4Props = {
    text1: string;
    text2: string;
    pred: string | undefined;
    onPress1: () => void;
    onPress2: (path: string) => void;
};

const Button4 = ({ text1, text2, pred, onPress1, onPress2 }: Button4Props) => {
    const [isChecked, setIsChecked] = useState(!!pred);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
        onPress1();
    };

    return (
        <View className="flex flex-row items-center border-b border-t border-zinc-800 bg-zinc-800/70 pl-4">
            <Checkbox
                value={isChecked}
                onValueChange={handleCheckboxPress}
                color={isChecked ? "#f4f4f5" : undefined}
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

