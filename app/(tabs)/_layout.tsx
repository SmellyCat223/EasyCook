import { Tabs } from "expo-router";
import { Icon } from 'react-native-elements';

const TabsLayout = () => {
    return (
        <Tabs     
            screenOptions={{
            headerStyle: {
              backgroundColor: '#0c0a09',
            },
            headerTintColor: "#f4f4f5",
            tabBarStyle: {
                backgroundColor: '#0c0a09',
              },
            tabBarActiveTintColor: '#f4f4f5',
            tabBarInactiveTintColor: '#71717a',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: () => <Icon name="home" type="antdesign" size={24} color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen name="recipe" options={{
                headerTitle: "Recipe",
                title: "Recipe",
                tabBarIcon: () => <Icon name="find" type="antdesign" size={24} color="#f3f4f6" />,
            }} />
            <Tabs.Screen name="meal-planner" options={{
                headerTitle: "Meal Planner",
                title: "Meal Planner",
                tabBarIcon: () => <Icon name="calendar" type="antdesign" size={24} color="#f3f4f6" />,
            }} />
            <Tabs.Screen name="grocery" options={{
                headerTitle: "Grocery",
                title: "Grocery",
                tabBarIcon: () => <Icon name="shoppingcart" type="antdesign" size={24} color="#f3f4f6" />,
            }} />
            <Tabs.Screen name="profile" options={{
                headerTitle: "Profile",
                title: "Profile",
                tabBarIcon: () => <Icon name="account-circle" type="materialcommunityicons" size={24} color="#f3f4f6" />,
            }} />
        </Tabs>
    );
};

export default TabsLayout;