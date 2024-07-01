import { Stack } from "expo-router";

const StackLayOut = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Grocery",
        headerStyle: {
          backgroundColor: '#0c0a09',
        },
        headerTintColor: "#f4f4f5",
      }}
    >
      <Stack.Screen 
        name="index-grocery"
        options={{
          headerTitle: "Grocery",
        }}
      />
    </Stack>
  );
};

export default StackLayOut;