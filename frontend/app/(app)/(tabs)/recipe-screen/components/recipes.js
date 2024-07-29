import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { CachedImage } from './image';
import Animated, { FadeInDown, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { Icon } from 'react-native-elements';
import YouTubeIframe from 'react-native-youtube-iframe';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Fraction from 'fraction.js';
import { supabase } from '../../../../supabase';

export default function Recipes({ categories, meals }) {
    const [mealPlan, setMealPlan] = useState({});
    const [userId, setUserId] = useState({});

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

    return (
        <View className="mx-4 py-2">
            {categories.length === 0 || meals.length === 0 ? null : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => (
                        <RecipeCard item={item} index={i} userId={userId} />
                    )}
                    onEndReachedThreshold={0.1}
                />
            )}
        </View>
    );
}

const RecipeCard = ({ item, index, userId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const springValue = useSharedValue(0);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMeal, setSelectedMeal] = useState("Breakfast");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withSpring(springValue.value, { damping: 12 }) }]
        };
    });

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

    const fetchRecipeDetails = async (idMeal) => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                setRecipeDetails(data.meals[0]);
            }
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible && !recipeDetails) {
            fetchRecipeDetails(item.idMeal);
        }
        springValue.value = modalVisible ? 0 : 1;
    };

    // Conversion map for Unicode fractions to decimal
    const unicodeFractions = {
        '¼': 0.25,
        '½': 0.5,
        '¾': 0.75,
        '⅐': 1 / 7,
        '⅑': 1 / 9,
        '⅒': 1 / 10,
        '⅓': 1 / 3,
        '⅔': 2 / 3,
        '⅕': 1 / 5,
        '⅖': 2 / 5,
        '⅗': 3 / 5,
        '⅘': 4 / 5,
        '⅙': 1 / 6,
        '⅚': 5 / 6,
        '⅛': 1 / 8,
        '⅜': 3 / 8,
        '⅝': 5 / 8,
        '⅞': 7 / 8
    };

    function parseMeasure(measure) {
        // Regular expression to match whole numbers, fractions (including Unicode fractions), and units
        const regex = /^(\d+)?\s*([\u00BC-\u00BE\u2150-\u215E\u2189\d+\/\d+])?\s*(.*)$/;
        const match = measure.match(regex);
        console.log(match);
        if (match) {
            const wholeNumber = match[1];
            const fraction = match[2];
            const unit = match[3].trim();

            let quantity = '';

            if (wholeNumber) {
                quantity += wholeNumber;
            }

            if (fraction) {
                quantity += unicodeFractions[fraction] || parseFloat(fraction);
            }

            return {
                quantity: quantity || '0',
                unit: unit || null
            };
        } else {
            // If no match, return nulls or handle it as needed
            return {
                quantity: null,
                unit: measure.trim() || null
            };
        }
    }

    const handleAddRecipe = async () => {
        try {
            // Check if recipe category exists in recipe_category table
            const { data: categoryData, error: categoryError } = await supabase
                .from('recipe_category')
                .select('recipe_category_id')
                .eq('recipe_category_name', recipeDetails?.strCategory);

            if (categoryError) {
                throw categoryError;
            }

            let categoryId;
            if (categoryData.length === 0) {
                // If category doesn't exist, insert it into recipe_category table
                const { data: insertCategoryData, error: insertCategoryError } = await supabase
                    .from('recipe_category')
                    .insert([{ recipe_category_name: recipeDetails?.strCategory }])
                    .select();

                if (insertCategoryError) {
                    throw insertCategoryError;
                }
                categoryId = insertCategoryData[0].recipe_category_id;
            } else {
                // If category exists, use the existing category_id
                categoryId = categoryData[0].recipe_category_id;
            }

            // Check if recipe exists in recipe table
            const { data: recipeData, error: recipeError } = await supabase
                .from('recipe')
                .select('recipe_id')
                .eq('recipe_name', recipeDetails?.strMeal);

            if (recipeError) {
                throw recipeError;
            }

            let recipeId;
            if (recipeData.length === 0) {
                // If recipe doesn't exist, insert it into recipe table
                const { data: insertRecipeData, error: insertRecipeError } = await supabase
                    .from('recipe')
                    .insert([{
                        recipe_name: recipeDetails?.strMeal,
                        user_id: userId,
                        recipe_category_id: categoryId,
                        recipe_picture: recipeDetails?.strMealThumb,
                        recipe_instruction: recipeDetails?.strInstructions,
                        recipe_area: recipeDetails?.strArea
                    }])
                    .select();

                if (insertRecipeError) {
                    throw insertRecipeError;
                }
                recipeId = insertRecipeData[0].recipe_id;
            } else {
                recipeId = recipeData[0].recipe_id;
            }

            // Extract all ingredients in the recipe
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredientName = recipeDetails[`strIngredient${i}`];
                const measure = recipeDetails[`strMeasure${i}`];

                if (ingredientName && measure) {
                    const parsed = parseMeasure(measure);
                    ingredients.push({
                        name: ingredientName,
                        quantity: parsed.quantity,
                        unit: parsed.unit
                    });
                } else if (ingredientName) {
                    ingredients.push({
                        name: ingredientName,
                        quantity: null,
                        unit: null
                    });
                } else {
                    break;
                }
            }

            for (let ingredient of ingredients) {
                // Check if ingredient exist in ingredient table
                const { data: ingredientData, error: ingredientError } = await supabase
                    .from('ingredient')
                    .select('ingredient_id')
                    .eq('ingredient_name', ingredient.name);

                if (ingredientError) {
                    throw ingredientError;
                }

                let ingredientId;
                if (ingredientData.length === 0) {
                    // If ingredient doesn't exist, insert it into ingredient table
                    const { data: insertIngredientData, error: insertIngredientError } = await supabase
                        .from('ingredient')
                        .insert([{ ingredient_name: ingredient.name }])
                        .select();

                    if (insertIngredientError) {
                        throw insertIngredientError;
                    }
                    ingredientId = insertIngredientData[0].ingredient_id;
                } else {
                    ingredientId = ingredientData[0].ingredient_id;
                }


                // Check if the pair of recipe and ingredient already exists in recipe_ingredient table
                const { data: recipeIngredientData, error: recipeIngredientError } = await supabase
                    .from('recipe_ingredient')
                    .select('recipe_ingredient_id')
                    .eq('recipe_id', recipeId)
                    .eq('ingredient_id', ingredientId);

                if (recipeIngredientError) {
                    throw recipeIngredientError;
                }

                // Insert into recipe_ingredient table only if the pair does not exist
                if (recipeIngredientData.length === 0) {
                    const { data: recipeIngredientInsertData, error: recipeIngredientInsertError } = await supabase
                        .from('recipe_ingredient')
                        .insert([{
                            recipe_id: recipeId,
                            ingredient_id: ingredientId,
                            ingredient_quantity: ingredient.quantity,
                            measurement_unit: ingredient.unit
                        }]);

                    if (recipeIngredientInsertError) {
                        throw recipeIngredientInsertError;
                    }

                    console.log('Successfully added ingredient to recipe_ingredient table:', ingredient.quantity);
                } else {
                    console.log('Ingredient already exists in recipe_ingredient table:', ingredient.name);
                }
            }

            // Insert the selected meal into meal table
            const { data: mealData, error: mealError } = await supabase
                .from('meal')
                .insert([
                    {
                        meal_calories: 0,
                        meal_date: format(selectedDate, 'yyyy-MM-dd'),
                        meal_type: selectedMeal,
                        user_id: userId,
                        meal_title: recipeDetails?.strMeal,
                        meal_recipe_id: recipeId
                    }
                ]);

            if (mealError) {
                throw mealError;
            }

            Alert.alert('Success', 'Item added successfully');
            toggleModal();
        } catch (error) {
            console.error('Error adding item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <TouchableOpacity
                className={`w-full ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}
                onPress={toggleModal}
            >
                <CachedImage
                    uri={item.strMealThumb}
                    className={`w-full ${index % 3 === 0 ? 'h-64' : 'h-96'} rounded-3xl bg-black/5`}
                />
                <Text className="text-sm mb-5 font-semibold ml-2 text-neutral-400">
                    {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
                </Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View className="mt-14 flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-2xl p-4 w-11/12 max-h-4/5">
                        <TouchableOpacity onPress={toggleModal} className="absolute top-2 right-2 p-2 z-10">
                            <Icon name="closecircle" type="antdesign" color="#6b7280" size={30} />
                        </TouchableOpacity>
                        {loading ? (
                            <ActivityIndicator size="large" className="mt-16" />
                        ) : (
                            <ScrollView className="px-4 space-y-2">
                                <CachedImage
                                    uri={recipeDetails?.strMealThumb || item.strMealThumb}
                                    className="w-60 h-64 rounded-2xl mb-3"
                                />
                                <Text className="text-3xl font-bold flex-1 text-neutral-700">{recipeDetails?.strMeal || item.strMeal}</Text>
                                <Text className="text-xl font-medium flex-1 text-neutral-500">{recipeDetails?.strArea || item.Area}</Text>

                                <Text className="font-bold text-lg">Ingredients:</Text>
                                <View className="ml-2">{getIngredients(recipeDetails)}</View>

                                <Text className="font-bold text-lg">Instructions:</Text>
                                <Text className="mb-4">{recipeDetails?.strInstructions || ''}</Text>

                                {recipeDetails?.strYoutube && (
                                    <View className="space-y-4">
                                        <Text className="font-bold text-lg">Recipe Video:</Text>
                                        <View>
                                            <YouTubeIframe
                                                videoID={getYoutubeVideoId(recipeDetails.strYoutube)}
                                                height={hp(30)}
                                            />
                                        </View>
                                    </View>
                                )}

                                <Text className="font-bold text-lg">Add to Meal Plan</Text>
                                <Button onPress={() => setShowDatePicker(true)} title="Select Date" />
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={selectedDate}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                    />)}
                                <Picker selectedValue={selectedMeal} onValueChange={(itemValue) => setSelectedMeal(itemValue)}>
                                    <Picker.Item label="Breakfast" value="Breakfast" />
                                    <Picker.Item label="Lunch" value="Lunch" />
                                    <Picker.Item label="Dinner" value="Dinner" />
                                </Picker>
                                <Button title="Add Recipe" onPress={handleAddRecipe} />
                            </ScrollView>)}
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
};

const getIngredients = (recipeDetails) => {
    if (!recipeDetails) return null;
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipeDetails[`strIngredient${i}`]) {
            ingredients.push(
                <Text key={`ingredient-${i}`} className="mb-1">
                    {`${recipeDetails[`strMeasure${i}`]} ${recipeDetails[`strIngredient${i}`]}`}
                </Text>
            );
        } else {
            break;
        }
    }
    return ingredients;
};
