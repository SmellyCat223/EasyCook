import { Stack } from "expo-router";

const StackLayOut = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Meal Planner",
        headerStyle: {
          backgroundColor: '#0c0a09',
        },
        headerTintColor: "#f4f4f5",
      }}
    >
      <Stack.Screen 
        name="index_mealPlanner"
        options={{
          headerTitle: "Meal Planner",
        }}
      />
    </Stack>
  );
};

export default StackLayOut;