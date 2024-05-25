import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Icon } from 'react-native-elements';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View } from 'react-native';

const RootLayout = () => {
/*
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
*/
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0c0a09',
          },
          headerTintColor: "#f4f4f5",
          drawerStyle: {
              backgroundColor: '#0c0a09',
            },
          drawerInactiveTintColor: '#f4f4f5',
          drawerPosition: "right",
          headerLeft: () => null,
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <DrawerToggleButton tintColor="#f4f4f5" />
            </View>
          ),
        }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: "Home",
            // headerShown: false,
            drawerLabel: "Home",
            drawerIcon: ({ size, color }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="inventory"
          options={{
            headerTitle: "Inventory",
            drawerLabel: "Inventory",
            drawerIcon: ({ size, color }) => (
              <Icon name="inventory" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
            drawerLabel: "Settings",
            drawerIcon: ({ size, color }) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="log-in"
          options={{
            headerTitle: "Log In",
            drawerLabel: "Log In",
            drawerIcon: ({ size, color }) => (
              <Icon name="login" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
