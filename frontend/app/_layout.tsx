import { Stack } from 'expo-router';

const RootLayOut = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="app"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayOut;