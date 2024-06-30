import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button } from "react-native";
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
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
}> = ({ day, date, bfastTitle, bfastCal, lunchTitle, lunchCal, dinnerTitle, dinnerCal }) => {
    return (
        <View className="m-2 p-4 bg-green-200 shadow rounded-lg">
            <View className="mb-2 border-b pb-2">
                <Text className="text-lg font-semibold">{day} {date}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Breakfast: {bfastTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{bfastCal} kcal</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Lunch: {lunchTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{lunchCal} kcal</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text>Dinner: {dinnerTitle}</Text>
                <View className="flex-row items-center">
                    <Text>{dinnerCal} kcal</Text>
                    <View className="flex-row ml-2">
                        <Icon name="edit" type="antdesign" size={15} />
                        <Icon name="delete" type="material" size={15} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const MealPlannerScreenComponent = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date()));

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
    }, [userId, currentWeekStart]);

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
                meal_title
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
            <View className="flex-row justify-between p-4">
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
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default MealPlannerScreenComponent;
