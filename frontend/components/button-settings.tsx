import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from 'react-native-elements';

type Button2Props = {
    text: string;
    icon1: string;
    icon2: string;
    onPress: (path: string) => void;
    path: string; // Add path as a prop
};
const Button2 = ({ text, icon1, icon2, onPress, path }: Button2Props) => {

    return (
        <View className="border-b border-t border-zinc-800">
            <TouchableOpacity
                onPress={() => onPress(path)}
                // onPress={(path: string) => onPress(path)}
                className={`flex justify-center bg-zinc-800/50 h-10`}
            >
                <View className="flex flex-row justify-between px-2">
                    <View className="flex flex-row w-4/5">
                        <Icon name={icon1} color="#f3f4f6" />
                        <Text className="text-base text-white">   {text}</Text>
                    </View>
                    <Icon name={icon2} color="#71717A" />
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default Button2;