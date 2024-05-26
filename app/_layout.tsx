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
                options={{ headerShown: false}}
            />
        </Stack>        
    );
};

export default RootLayOut;