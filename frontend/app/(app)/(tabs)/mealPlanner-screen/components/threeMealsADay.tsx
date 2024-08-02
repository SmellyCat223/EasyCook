import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase';
import { format, addDays, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import NextMeal from '../../home-screen/components/next-meal';
import AutogenerateGrocery from './autogenerate-grocery';

interface Item {
    meal_calories: number;
    meal_date: string; // Will be formatted to a string for display
    meal_type: string;
    user_id: string;
    meal_title: string;
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
    // onDelete: () => void;
}> = ({ day, date, bfastTitle, bfastCal, lunchTitle, lunchCal, dinnerTitle, dinnerCal }) => {
    const showAlert = () => {
        alert('Feature coming soon!');
    };

    return (
        <View style={{ margin: 10, padding: 16, backgroundColor: '#B2F5EA', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
            <View style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{day} {date}</Text>
            </View>
            <View className="flex-row justify-between mb-5">
                <Text>Breakfast: {bfastTitle}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1 }}>{bfastTitle}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="edit" type="antdesign" size={15} style={{ marginRight: 8 }} />
                        <Icon name="delete" type="material" size={15} onPress={showAlert} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-5">
                <Text>Lunch: {lunchTitle}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1 }}>{lunchTitle}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="edit" type="antdesign" size={15} style={{ marginRight: 8 }} />
                        <Icon name="delete" type="material" size={15} onPress={showAlert} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-5">
                <Text>Dinner: {dinnerTitle}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1 }}>{dinnerTitle}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="edit" type="antdesign" size={15} style={{ marginRight: 8 }} />
                        <Icon name="delete" type="material" size={15} onPress={showAlert} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const MealPlannerScreenComponent = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date()));
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
    }, [userId, currentWeekStart, items]);

    useEffect(() => {
        // Filter meals for today and update nextMeals state
        const todayMeals = items.filter(item => isToday(item.meal_date));

        console.log(todayMeals);
        setNextMeals(todayMeals);
    }, [items]);

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
            // console.log('Fetched items:', data);
            setItems(data);
        }
    };

    // const deleteMeal = async (mealId: string) => {
    //     const { error } = await supabase
    //         .from('meal')
    //         .delete()
    //         .eq('meal_id', mealId);
    
    //     if (error) {
    //         console.error('Error deleting meal:', error);
    //     } else {
    //         // Re-fetch meals after deletion
    //         fetchMeals(userId);
    //     }
    // };
    
    // const handleDeleteMeal = (mealId: string) => {
    //     deleteMeal(mealId);
    // };
    

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
        // console.log('Meals for day:', mealsForDay); 

        const breakfast = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'breakfast');
        // console.log('Breakfast for day:', breakfast);

        const lunch = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'lunch');
        // console.log('Lunch for day:', lunch);

        const dinner = mealsForDay.find(meal => meal.meal_type.toLowerCase() === 'dinner');
        // console.log('Dinner for day:', dinner);
        return {
            date,
            bfastTitle: breakfast?.meal_title || '',
            bfastCal: typeof breakfast?.meal_calories === 'number' ? breakfast.meal_calories : parseInt(breakfast?.meal_calories || '0'),
            lunchTitle: lunch?.meal_title || '',
            lunchCal: typeof lunch?.meal_calories === 'number' ? lunch.meal_calories : parseInt(lunch?.meal_calories || '0'),
            dinnerTitle: dinner?.meal_title || '',
            dinnerCal: typeof dinner?.meal_calories === 'number' ? dinner.meal_calories : parseInt(dinner?.meal_calories || '0'),
        };
    };


    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <Button title="Previous Week" onPress={handlePrevWeek} />
                <Button title="Next Week" onPress={handleNextWeek} />
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
                            // onDelete={() => handleDeleteMeal(mealId)}
                        />
                    );
                })}
            </ScrollView>
            <AutogenerateGrocery />
            {/* Render NextMeal component with today's meals
            {nextMeals.length > 0 && (
                <NextMeal
                    date={format(new Date(nextMeals[0].meal_date), 'dd MMM yyyy')}
                    meal="Today's Meals"
                    breakfast={nextMeals.find(meal => meal.meal_type === 'Breakfast')?.meal_title || 'No Breakfast'}
                    lunch={nextMeals.find(meal => meal.meal_type === 'Lunch')?.meal_title || 'No Lunch'}
                    dinner={nextMeals.find(meal => meal.meal_type === 'Dinner')?.meal_title || 'No Dinner'}
                    calories={nextMeals.reduce((acc, meal) => acc + meal.meal_calories, 0)}
                />
            )} */}
        </View>
    );
};

export default MealPlannerScreenComponent;