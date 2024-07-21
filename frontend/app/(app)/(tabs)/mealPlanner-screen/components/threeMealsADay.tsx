import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Button, Alert, Modal, TextInput } from "react-native";
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase';
import { format, addDays, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import NextMeal from '../../home-screen/components/next-meal';
import EditItem from '../../../../../components/edit-item';

interface Item {
    meal_calories: number;
    meal_date: string; // Will be formatted to a string for display
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
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => onDelete(mealId)
                }
            ]
        );
    };

    return (
        <View style={{ margin: 10, padding: 16, backgroundColor: '#B2F5EA', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}>
            <View style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{day} {date}</Text>
            </View>
            {/* <View className="flex-row justify-between mb-5">
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
            </View> */}
            {['Breakfast', 'Lunch', 'Dinner'].map((mealType, index) => {
                const mealTitle = mealType === 'Breakfast' ? bfastTitle : mealType === 'Lunch' ? lunchTitle : dinnerTitle;
                const mealCal = mealType === 'Breakfast' ? bfastCal : mealType === 'Lunch' ? lunchCal : dinnerCal;
                const meal = items.find(item => item.meal_date === date && item.meal_type.toLowerCase() === mealType.toLowerCase());
                console.log('Meal found:', meal);


                return (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>{mealType}: {mealTitle}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ flex: 1 }}>{mealTitle}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="edit" type="antdesign" size={15} style={{ marginRight: 8 }} onPress={() => onEdit({ meal_calories: mealCal, meal_date: date, meal_type: mealType, user_id: '', meal_title: mealTitle, meal_id: meal?.meal_id || '' })} />
                                <Icon name="delete" type="material" size={15} onPress={() => handleDelete(meal?.meal_id || '')} />
                            </View>
                        </View>
                    </View>
                );
            })}

        </View>
    );
};

const MealPlannerScreenComponent = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date()));
    const [nextMeals, setNextMeals] = useState<Item[]>([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentMeal, setCurrentMeal] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);

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
            console.log('Fetched meals:', data);
            setItems(data);
        }
    };

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

    // Fetch meals when userId or currentWeekStart changes
    useEffect(() => {
        if (userId) {
            fetchMeals(userId);
        }
    }, [userId, currentWeekStart]);

    // Handle loading state
    useEffect(() => {
        if (!loading) {
            const todayMeals = items.filter(item => isToday(item.meal_date));
            console.log(todayMeals);
            setNextMeals(todayMeals);
        }
    }, [items, loading]);



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

    const handleEditMeal = (meal: Item) => {
        setCurrentMeal(meal);
        setEditModalVisible(true);
    };

    const handleSaveEdit = async () => {
        if (currentMeal) {
            const { error } = await supabase
                .from('meal')
                .update({
                    meal_title: currentMeal.meal_title,
                    meal_calories: currentMeal.meal_calories
                })
                .eq('meal_id', currentMeal.meal_id);

            if (error) {
                console.error('Error updating meal:', error);
            } else {
                fetchMeals(userId!);
                setEditModalVisible(false);
                setCurrentMeal(null);
            }
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
                            onEdit={handleEditMeal}
                            onDelete={handleDeleteMeal}
                            items = {items}
                        />
                    );
                })}
            </ScrollView>
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

            {/* <Modal visible={editModalVisible} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Edit Meal</Text>
                    {currentMeal && (
                        <>
                            <TextInput
                                value={currentMeal.meal_title}
                                onChangeText={(text) => setCurrentMeal({ ...currentMeal, meal_title: text })}
                                placeholder="Meal Title"
                            />
                            <TextInput
                                value={currentMeal.meal_calories.toString()}
                                onChangeText={(text) => setCurrentMeal({ ...currentMeal, meal_calories: parseInt(text) })}
                                placeholder="Calories"
                                keyboardType="numeric"
                            />
                            <Button title="Save" onPress={handleSaveEdit} />
                            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                        </>
                    )}
                </View>
            </Modal> */}
        </View>
    );
};

export default MealPlannerScreenComponent;
