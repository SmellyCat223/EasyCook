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
                name="meal-planner"
                options={{
                    headerTitle: "Meal Planner",
                    title: "Meal Planner",
                    tabBarIcon: () => <Icon name="calendar-today" color="#f3f4f6" />,
                }}
            />
            <Tabs.Screen
                name="grocery"
                options={{
                    headerTitle: "Grocery",
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
                name="home-screen/index"
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
                name="home-screen/components/next-meal"
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
                name="home-screen/components/group-request"
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
                name="home-screen/components/stats"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/header"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="settings-screen/components/inventory"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="recipe-screen/components/recipe-first"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="settings-screen/components/login"
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
                name="recipe-screen/index"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="settings-screen/components/profile"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;

/*
const Stack = createStackNavigator();

const StackLayOut = () => {
return (
    <Stack.Navigator>
    <Stack.Screen 
        name="Home"
        component={Index}
        options={{
          headerShown: false, // Hide the header for the parent Home screen
        }}
    />
    <Stack.Screen 
        name="Profile"
        component={Recipe}
        options={{
          headerTitle: "Profile", // Set the title for the Profile screen
        }}
    />
    <Stack.Screen 
        name="Recipe"
        component={MealPlanner}
        options={{
          headerTitle: "Recipe", // Set the title for the Recipe screen
        }}
/>
    <Stack.Screen 
        name="MealPlanner"
        component={Grocery}
        options={{
          headerTitle: "Meal Planner", // Set the title for the Meal Planner screen
        }}
    />
    <Stack.Screen 
        name="Grocery"
        component={Profile}
        options={{
          headerTitle: "Grocery", // Set the title for the Grocery screen
        }}
    />
    </Stack.Navigator>
);
};

export default StackLayOut;
*/