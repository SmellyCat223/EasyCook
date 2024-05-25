import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="menu"
        options={{
          headerTitle: "Menu",
          headerStyle: {
            backgroundColor: "#0c0a09",
          },
          headerTitleStyle: {
            color: "#f4f4f5",
          },
        }}
      />
    </Stack>
  );
};

export default RootLayout;
