import { Stack } from 'expo-router';

const RootLayOut = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="(tabs)"
            >
            </Stack.Screen>
        </Stack>        
    );
};

export default RootLayOut;