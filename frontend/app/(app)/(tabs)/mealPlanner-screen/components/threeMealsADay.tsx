import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, Alert, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase';
import { format, addDays, startOfWeek, endOfWeek, isToday } from 'date-fns';
import AutogenerateGrocery from './autogenerate-grocery';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
interface Item {
    meal_calories: number;
    meal_date: string;
    meal_type: string;
    user_id: string;
    meal_title: string;
    meal_id: string;
}

const Day: React.FC<{
    day: string;
    date: string;
    bfastTitle: string;
    bfastCal: number;
    lunchTitle: string;
    lunchCal: number;
    dinnerTitle: string;
    dinnerCal: number;
    onEdit: (meal: Item) => void;
    onDelete: (mealId: string) => void;
    items: Item[];
}> = ({ day, date, bfastTitle, bfastCal, lunchTitle, lunchCal, dinnerTitle, dinnerCal, onEdit, onDelete, items }) => {

    const handleDelete = (mealId: string) => {
        Alert.alert(
            "Delete Meal",
            "Are you sure you want to delete this meal?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => onDelete(mealId) }
            ]
        );
    };


    return (
        <LinearGradient
            colors={['#F4C3C2', '#DCC6A0']}
            style={{ margin: 10, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}
        >
            <View style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{day} {date}</Text>
            </View>
            {['Breakfast', 'Lunch', 'Dinner'].map((mealType, index) => {
                const mealTitle = mealType === 'Breakfast' ? bfastTitle : mealType === 'Lunch' ? lunchTitle : dinnerTitle;
                const mealCal = mealType === 'Breakfast' ? bfastCal : mealType === 'Lunch' ? lunchCal : dinnerCal;
                const meal = items.find(item => item.meal_date === date && item.meal_type.toLowerCase() === mealType.toLowerCase());

                const router = useRouter();
                return (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>{mealType}: {mealTitle || "No meal chosen yet."}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {meal ? (
                                <>
                                    <Icon name="delete" type="material" size={15} onPress={() => handleDelete(meal.meal_id)} />
                                </>
                            ) : (
                                <Icon name="add" size={15} onPress={() => router.push('/(tabs)/recipe')} />
                            )}
                        </View>
                    </View>
                );
            })}
        </LinearGradient>
    );
};

const MealPlannerScreenComponent = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date()));
    const [nextMeals, setNextMeals] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

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
    }, [userId, currentWeekStart, items]);

    useEffect(() => {
        if (!loading) {
            const todayMeals = items.filter(item => isToday(item.meal_date));
            setNextMeals(todayMeals);
        }
    }, [items, loading]);

    const fetchMeals = async (userId: string) => {
        const start = format(currentWeekStart, 'yyyy-MM-dd');
        const end = format(endOfWeek(currentWeekStart), 'yyyy-MM-dd');

        const { data, error } = await supabase
            .from('meal')
            .select(`
                meal_calories,
                meal_date,
                meal_type,
                user_id,
                meal_title,
                meal_id
            `)
            .eq('user_id', userId)
            .gte('meal_date', start)
            .lte('meal_date', end);

        if (error) {
            console.error('Error fetching items:', error);
        } else if (data) {
            setItems(data);
        }
    };

    const handleDeleteMeal = async (mealId: string) => {
        if (!mealId) {
            console.error('Invalid meal ID', mealId);
            return;
        }

        const { error } = await supabase
            .from('meal')
            .delete()
            .eq('meal_id', mealId);

        if (error) {
            console.error('Error deleting meal:', error);
        } else {
            fetchMeals(userId!);
        }
    };


    const generateWeekDates = (start: Date) => {
        return Array.from({ length: 7 }).map((_, index) => addDays(start, index));
    };

    const weekDates = generateWeekDates(currentWeekStart);

    const handlePrevWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, -7));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(addDays(currentWeekStart, 7));
    };

    const formatMealsForDay = (date: string) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        const mealsForDay = items.filter(item => item.meal_date === formattedDate);

        const breakfast = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'breakfast');
        const lunch = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'lunch');
        const dinner = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'dinner');
        return {
            date,
            bfastTitle: breakfast?.meal_title || '',
            bfastCal: breakfast?.meal_calories || 0,
            lunchTitle: lunch?.meal_title || '',
            lunchCal: lunch?.meal_calories || 0,
            dinnerTitle: dinner?.meal_title || '',
            dinnerCal: dinner?.meal_calories || 0,
        };
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <TouchableOpacity
                    onPress={handlePrevWeek}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#F4C3C2',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                    }}>
                        {'<<'}
                    </Text>
                </TouchableOpacity>
                <View >
                    <AutogenerateGrocery />
                </View>
                <TouchableOpacity
                    onPress={handleNextWeek}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#F4C3C2',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000000',
                    }}>
                        {'>>'}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {weekDates.map((date, index) => {
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    const { bfastTitle, bfastCal, lunchTitle, lunchCal, dinnerTitle, dinnerCal } = formatMealsForDay(formattedDate);
                    const day = format(date, 'E');
                    return (
                        <Day
                            key={index}
                            day={day}
                            date={formattedDate}
                            bfastTitle={bfastTitle}
                            bfastCal={bfastCal}
                            lunchTitle={lunchTitle}
                            lunchCal={lunchCal}
                            dinnerTitle={dinnerTitle}
                            dinnerCal={dinnerCal}
                            onDelete={handleDeleteMeal}
                            items={items}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default MealPlannerScreenComponent;