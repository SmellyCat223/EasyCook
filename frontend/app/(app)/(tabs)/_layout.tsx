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
                    borderTopWidth: 0,
                },
                // tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#71717a',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: () => <Icon name="home" size={24} color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="recipe"
                options={{
                    headerTitle: "Recipe",
                    title: "Recipe",
                    tabBarIcon: () => <Icon name="search" color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="mealPlanner-screen"
                options={{
                    headerShown: false,
                    title: "Meal Planner",
                    tabBarIcon: () => <Icon name="calendar-today" color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="grocery-screen"
                options={{
                    headerShown: false,
                    title: "Grocery",
                    tabBarIcon: () => <Icon name="shopping-basket" color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="settings-screen"
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: () => <Icon name="settings" color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="home-screen/index_homescreen"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/article"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/expiring"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/header"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/next-meal"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/search"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="home-screen/components/update-inventory"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/index_recipe"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/categories"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/recipes"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/image"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/search-bar"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="expiring-screen"
                options={{
                    href: null,
                    headerTitle: "Expiration Dates",
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;