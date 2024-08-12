import React, { FC, useState, useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import SignIn from '../components/sign-in';
import SignUp from '../components/sign-up';
import { Icon } from 'react-native-elements';
import ErrorBoundary from './ErrorBoundary';

const App: FC = () => {
    const [currentComponent, setCurrentComponent] = useState<'one' | 'two'>('one');
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(
            scaleAnim,
            {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }
        ).start();
    }, [scaleAnim]);

    const switchComponent = () => {
        setCurrentComponent(currentComponent === 'one' ? 'two' : 'one');
    };

    return (
        <ErrorBoundary>
            <View className="flex-1 justify-center items-center bg-stone-950">
                <View className="h-2/3">
                    <View className="h-20 space-y-2 p-4 items-center">
                        <View className="flex flex-row items-center">
                            <Animated.View style={{ transform: [{ scale: scaleAnim }] }} className="rounded-full bg-green-500 w-12 h-12 items-center justify-center">
                                <Icon name="restaurant" color="black" size={36} />
                            </Animated.View>
                            <View style={{ width: 10 }} />
                            <Animated.Text style={{ transform: [{ scale: scaleAnim }] }} className="text-3xl text-white font-bold">
                                EasyCook
                            </Animated.Text>
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
        </ErrorBoundary>
    );
};

export default App;