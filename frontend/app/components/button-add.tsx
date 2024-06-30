import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from 'react-native-elements';

type ButtonAddProps = {
    onPress: (path: string) => void;
};
const ButtonAdd: React.FC<ButtonAddProps> = ({ onPress }: ButtonAddProps) => {

    return (
        <View className="border-b border-t border-zinc-800">
            <TouchableOpacity
                onPress={onPress}
                className={"flex flex-row justify-center items-center bg-zinc-700/50 h-10"}
            >
                <View className="pr-2">
                    <Icon name="add" type="ionicons" color="#71717A" />
                </View>
                <View>
                    <Text className="text-base text-white">Add item</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default ButtonAdd;