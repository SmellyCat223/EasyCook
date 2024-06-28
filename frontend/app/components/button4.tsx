import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from 'react-native-elements';

type Button4Props = {
    text1: string;
    text2: string;
    icon1: string;
    onPress: (path: string) => void;
    path: string; // Add path as a prop
};
const Button4 = ({ text1, text2, icon1, onPress, path }: Button4Props) => {

    return (
        <View className="border-b border-t border-zinc-800">
            <TouchableOpacity
                onPress={() => onPress(path)}
                // onPress={(path: string) => onPress(path)}
                className={`flex justify-center bg-zinc-800/70 h-10`}
            >
                <View className="flex flex-row justify-between px-2">
                    <View className="flex flex-row w-4/5">
                        <Icon name={icon1} color="#f3f4f6" />
                        <Text className="text-base text-white">   {text1}</Text>
                    </View>
                    <Text className="text-base text-white">{text2}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default Button4;