import { Stack } from 'expo-router';
import { useUser } from '../UserContext';

export default function Root() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};