import { Stack } from "expo-router";
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

const StackLayOut = () => {
  return (
    <Stack 
        screenOptions={{
            headerTitle: "Settings",
            headerStyle: {
            backgroundColor: '#0c0a09',
            },
            headerTintColor: "#f4f4f5",
            // TabBarStyle: {
            //     backgroundColor: '#0c0a09',
            //     borderTopWidth: 0,
            // },
        }}
    >
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
      <Stack.Screen 
        name="components/login"
        options={{
          headerTitle: "Login",
        }}
      />
    </Stack>
  );
};

export default StackLayOut;