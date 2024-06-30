import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { format, isToday, parseISO } from 'date-fns';
import { supabase } from '../../../../supabase';
import MealPlannerScreen from '../../mealPlanner-screen/index_mealPlanner';

interface Item {
    meal_calories: number;
    meal_date: string; // Will be formatted to a string for display
    meal_type: string;
    user_id: string;
    meal_title: string;
}

const NextMeal = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [nextMeals, setNextMeals] = useState<Item[]>([]);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                setUserId(data.session.user.id);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchMeals(userId);
        }
    }, [userId]);

    useEffect(() => {
        // Filter meals for today and update nextMeals state
        const todayMeals = items.filter(item => isToday(parseISO(item.meal_date)));
        setNextMeals(todayMeals);
    }, [items]);

    const fetchMeals = async (userId: string) => {
        const { data, error } = await supabase
            .from('meal')
            .select(`
                meal_calories,
                meal_date,
                meal_type,
                user_id,
                meal_title
            `)
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching meals:', error);
        } else if (data) {
            setItems(data);
        }
    };

    let meal = "Today's Meals";
    let breakfast = "No Breakfast";
    let lunch = "No Lunch";
    let dinner = "No Dinner";
    let calories = 0;

    // Update values if meals for today are fetched
    if (nextMeals.length > 0) {
        breakfast = nextMeals.find(meal => meal.meal_type === 'Breakfast')?.meal_title || "No Breakfast";
        lunch = nextMeals.find(meal => meal.meal_type === 'Lunch')?.meal_title || "No Lunch";
        dinner = nextMeals.find(meal => meal.meal_type === 'Dinner')?.meal_title || "No Dinner";
        calories = nextMeals.reduce((acc, meal) => acc + meal.meal_calories, 0);
    }

    return (
        <Link href="/meal-planner" asChild>
            <TouchableOpacity>
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ borderRadius: 12, padding: 16, backgroundColor: '#B2F5EA', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 7 }}>{meal}</Text>
                            <Icon name="edit" type="antdesign" size={20} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16 }}>Breakfast: {breakfast}</Text>
                                <Text style={{ fontSize: 16 }}>Lunch: {lunch}</Text>
                                <Text style={{ fontSize: 16 }}>Dinner: {dinner}</Text>
                            </View>
                            <View style={{ backgroundColor: '#EDF2F7', padding: 4, borderRadius: 12 }}>
                                <Text style={{ fontSize: 16 }}>{calories} kcal</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default NextMeal;
