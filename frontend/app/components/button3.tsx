import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from 'react-native-elements';

type Button3Props = {
    text1: string;
    text2: string;
    text3: string;
    onPress: (path: string) => void;
    path: string; // Add path as a prop
};
const Button3 = ({ text1, text2, text3, onPress, path }: Button3Props) => {

    return (
        <View className="border-b border-t border-zinc-800">
            <TouchableOpacity
                onPress={() => onPress(path)}
                // onPress={(path: string) => onPress(path)}
                className={`flex justify-center bg-zinc-800/50 h-10`}
            >
                <View className="flex flex-row justify-between px-2">
                    <View className="w-1/3">
                        <Text className="text-base text-white">{text1}</Text>
                    </View>
                    <View className="w-1/3 items-center">
                        <Text className="text-base text-white">{text2}</Text>
                    </View>
                    <View className="w-1/3 items-end">
                        <Text className="text-base text-white">{text3}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default Button3;