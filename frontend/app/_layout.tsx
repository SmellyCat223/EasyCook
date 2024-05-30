import { Slot } from 'expo-router';
import { SessionProvider } from './ctx';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );

  // return (
  //   <Stack
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Stack.Screen
  //       name="(tabs)"
  //       options={{ headerShown: false }}
  //     />
  //   </Stack>
  // );
}
