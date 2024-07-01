import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import { CachedImage } from './image';
import Animated, { FadeInDown, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { Icon } from 'react-native-elements';
import YouTubeIframe, { getYoutubeMeta } from 'react-native-youtube-iframe';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
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
        <View style={{ marginHorizontal: wp(4), paddingVertical: hp(2) }}>
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
    let isEven = index % 2 === 0;
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
            // Fetch recipe details only when modal is opening and details are not yet fetched
            fetchRecipeDetails(item.idMeal);
        }
        springValue.value = modalVisible ? 0 : 1;
    };

    const handleAddRecipe = async () => {
        try {
            const { data, error } = await supabase
                .from('meal')
                .insert([
                    {
                        meal_calories: 0,
                        meal_date: format(selectedDate, 'yyyy-MM-dd'),
                        meal_type: selectedMeal,
                        user_id: userId,
                        meal_title: recipeDetails?.strMeal
                    }
                ]);

            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Item added successfully');
            toggleModal(); // Close the modal after successful submission
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
                style={{ width: '100%', paddingLeft: index % 2 === 0 ? 0 : 8, paddingRight: index % 2 === 0 ? 8 : 0 }}
                onPress={toggleModal}
            >
                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                />
                <Text style={{ fontSize: hp(1.5), marginBottom: 20 }} className="font-semibold ml-2 text-neutral-400">
                    {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
                </Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Icon name="closecircle" type="antdesign" color="#6b7280" size={30} />
                        </TouchableOpacity>
                        {loading ? (
                            <ActivityIndicator size="large" classname='mt-16' />
                        ) : (
                            <ScrollView className='px-4 flex space-y-2'>
                                <CachedImage
                                    uri={recipeDetails?.strMealThumb || item.strMealThumb}
                                    style={{ width: wp(60), height: hp(25), borderRadius: 20, marginBottom: 12 }}
                                />
                                <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>{recipeDetails?.strMeal || item.strMeal}</Text>
                                <Text style={{ fontSize: hp(2) }} className='font-medium flex-1 text-neutral-500'>{recipeDetails?.strArea || item.Area}</Text>

                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ingredients:</Text>
                                <View style={{ marginLeft: 10 }}>{getIngredients(recipeDetails)}</View>

                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Instructions:</Text>
                                <Text style={{ marginBottom: 16 }}>{recipeDetails?.strInstructions || ''}</Text>

                                {recipeDetails?.strYoutube && (
                                    <View className="space-y-4">
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Recipe Video:</Text>
                                        <View>
                                            <YouTubeIframe
                                                videoID={getYoutubeVideoId(recipeDetails.strYoutube)}
                                                height={hp(30)}
                                            />
                                        </View>
                                    </View>
                                )}

                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Add to Meal Plan</Text>
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

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: '85%',
        maxHeight: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: hp(1),
        right: wp(2),
        padding: 10,
        zIndex: 1, // Ensure the close button is on top of the modal content
    },
});

// Helper function to format ingredients list
const getIngredients = (recipeDetails) => {
    if (!recipeDetails) return null;
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipeDetails[`strIngredient${i}`]) {
            ingredients.push(
                <Text key={`ingredient-${i}`} style={{ marginBottom: 4 }}>
                    {`${recipeDetails[`strMeasure${i}`]} ${recipeDetails[`strIngredient${i}`]}`}
                </Text>
            );
        } else {
            break;
        }
    }
    return ingredients;
};