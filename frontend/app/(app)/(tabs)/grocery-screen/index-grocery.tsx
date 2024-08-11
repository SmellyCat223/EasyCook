import { View } from "react-native";
import GroceryBody from './components/grocery';


const GroceryScreen = () => {

    return (
        <View className="flex-1 bg-stone-950">
            <GroceryBody />
        </View>
    );
};

export default GroceryScreen;