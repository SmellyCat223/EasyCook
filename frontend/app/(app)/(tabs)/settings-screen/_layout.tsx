import { Stack } from "expo-router";

const StackLayOut = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Settings",
        headerStyle: {
          backgroundColor: '#0c0a09',
        },
        headerTintColor: "#f4f4f5",
      }}
    >
      <Stack.Screen 
        name="index-settings"
        options={{
          headerTitle: "Settings",
        }}
      />
      <Stack.Screen 
        name="components/profile"
        options={{
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen 
        name="components/inventory"
        options={{
          headerTitle: "Inventory",
        }}
      />
    </Stack>
  );
};

export default StackLayOut;