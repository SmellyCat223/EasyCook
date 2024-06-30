import React from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import RecipeDetailScreen from './recipe-indi';
import { CachedImage } from './image';
import Animated, { FadeInDown, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';


export default function Recipes({ categories, meals }) {
    const navigation = useNavigation();

    return (
        <View style={{ marginHorizontal: wp(4), paddingVertical: hp(2) }}>
            {categories.length === 0 || meals.length === 0 ? null : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => (
                        <RecipeCard item={item} index={i} navigation={navigation} />
                    )}
                    onEndReachedThreshold={0.1}
                />
            )}
        </View>
    );
}

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 === 0;

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('recipe-screen/components/recipe-indi', { item })}
            >
                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                />
                <Text style={{ fontSize: hp(1.5) }} className="font-semibold ml-2 text-neutral-400">
                    {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    );
};
