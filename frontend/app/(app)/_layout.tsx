import { Stack } from 'expo-router';
import { useUser } from '../UserContext';

export default function Root() {
  const { username } = useUser();
  console.log(username + "in _layout_Root")

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