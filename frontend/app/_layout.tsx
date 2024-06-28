import { Stack } from 'expo-router';
import { UserProvider } from './UserContext';

export default function Root() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
      </Stack>
    </UserProvider>
  );
};





