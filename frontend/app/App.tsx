import { FC, useState } from 'react';
import { View, Text } from 'react-native';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { Icon } from 'react-native-elements';

const App: FC = () => {
    const [currentComponent, setCurrentComponent] = useState<'one' | 'two'>('one');

    const switchComponent = () => {
        setCurrentComponent(currentComponent === 'one' ? 'two' : 'one');
    };

    return (
        <View className="flex-1 justify-center items-center bg-stone-950">
            <View className="h-2/3">
                <View className="h-20 space-y-2 p-4 items-center">
                    <View className="flex flex-row items-center">
                        <View className="rounded-full bg-green-500 w-12 h-12 items-center justify-center">
                            <Icon name="restaurant" color="black" size={36} />      
                        </View>
                        <Text className="text-3xl text-white font-bold">  EasyCook</Text>                        
                    </View>

                </View>
                <View className="h-80">
                    {currentComponent === 'one' ? (
                        <SignIn switchComponent={switchComponent} />
                    ) : (
                        <SignUp switchComponent={switchComponent} />
                    )}
                </View>
            </View>
        </View>
    );
};

export default App;