/* import { Stack } from 'expo-router';
import { useUser, UserProvider } from './UserContext';

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

*/

import { Stack } from 'expo-router';
import { useUser, UserProvider } from './UserContext';
import React, { useEffect } from 'react';

export default function Root() {
  return (
    <UserProvider>
      <DebugUsername />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />
      </Stack>
    </UserProvider>
  );
}

const DebugUsername = () => {
  const { username } = useUser();

  useEffect(() => {
    console.log('Root component - username:', username);
  }, [username]);

  return null;
};






