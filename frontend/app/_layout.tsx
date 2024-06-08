// import { Stack } from 'expo-router';

// export default function Root() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen
//         name="index"
//         options={{ headerShown: false }}
//       />
//     </Stack>
//   );
// };

// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Add other screens here */}
    </Stack>
  );
}

