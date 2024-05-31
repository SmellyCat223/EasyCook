
import { FC, useState } from 'react';
import { View, Text } from 'react-native';
import SignIn from './sign-in';
import SignUp from './sign-up';

const Index: FC = () => {
    const [currentComponent, setCurrentComponent] = useState<'one' | 'two'>('one');

    const switchComponent = () => {
        setCurrentComponent(currentComponent === 'one' ? 'two' : 'one');
    };

    return (
        <View className="flex-1 justify-center items-center bg-stone-950">
            <View className="h-100 w-4/5">
                <View className="h-16 space-y-2 p-4 items-center">
                    <Text className="text-3xl text-white font-bold">EasyCook</Text>
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

export default Index;