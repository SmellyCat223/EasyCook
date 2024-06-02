import { View } from "react-native";
import Home from "./home-screen/index";
import { enableScreens } from 'react-native-screens';
enableScreens();

const Index = () => {
    return (
        <View className="flex-1 bg-stone-950">
            <Home />
        </View>
    );
};

export default Index;