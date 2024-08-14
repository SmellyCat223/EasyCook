import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import { format, isToday, parseISO } from 'date-fns';
import { supabase } from '../../../../supabase';

interface Item {
    meal_calories: number;
    meal_date: string;
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
        const channel = supabase
            .channel(`public:meal:user_id=eq.${userId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'meal' }, (payload) => {
                console.log('Real-time update:', payload);
                fetchMeals(userId);
            })
            .subscribe();

        // Clean up subscription on component unmount
        return () => {
            supabase.removeChannel(channel);

        };
    }, [userId]);

    useEffect(() => {
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
            console.log('Error fetching meals:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const refreshMeals = () => {
        if (userId) {
            fetchMeals(userId);
        }
    };

    let meal = "Today's Meals";
    let breakfast = "No Breakfast";
    let lunch = "No Lunch";
    let dinner = "No Dinner";

    // Update values if meals for today are fetched
    if (nextMeals.length > 0) {
        breakfast = nextMeals.find(meal => meal.meal_type === 'Breakfast')?.meal_title || "No Breakfast";
        lunch = nextMeals.find(meal => meal.meal_type === 'Lunch')?.meal_title || "No Lunch";
        dinner = nextMeals.find(meal => meal.meal_type === 'Dinner')?.meal_title || "No Dinner";
    }

    return (
        <Link href="../../mealPlanner-screen/index_mealPlanner" asChild>
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Icon name="calendar" type="antdesign" size={25} color="#4A4A4A" />
                            <TouchableOpacity onPress={refreshMeals} style={styles.refreshButton}>
                                <Icon name="refresh" type="material" size={25} color="#4A4A4A" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <Text className="w-3/5" >{meal}</Text>
                            <View className="text-xl ">
                                <Text className="text-2xl ">Breakfast: {breakfast}</Text>
                                <Text className="text-2xl ">Lunch: {lunch}</Text>
                                <Text className="text-2xl ">Dinner: {dinner}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 1,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#d1fae5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    refreshButton: {
        padding: 8,
        borderRadius: 50,
    },
    content: {
        paddingTop: 8,
    },
});

export default NextMeal;
