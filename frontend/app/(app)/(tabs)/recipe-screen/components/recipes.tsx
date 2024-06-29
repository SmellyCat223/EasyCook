import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import RecipeDetailScreen from './recipe-indi';
import { CachedImage } from './image';

interface Meal {
    id: string;
    strMealThumb: string;
    strMeal: string;
}

interface CategoriesProps {
    categories: { strCategory: string, strCategoryThumb: string }[];
    meals: Meal[];
}

export default function Recipes({ categories, meals }: CategoriesProps) {
    const navigation = useNavigation();
    return (
        <View style={{ marginHorizontal: wp(4), paddingVertical: hp(2) }}>
            {categories.length == 0 || meals.length == 0 ? null : (
                <MasonryList<Meal>
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    onEndReachedThreshold={0.1}
                />)}

        </View>
    );
}

interface RecipeCardProps {
    item: Meal;
    index: number;
    navigation: any;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, index, navigation }) => {

    let isEven = index % 2 === 0;
    return (
        <View style={{ marginBottom: hp(2) }}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center mb-4 space-y-1"
                // onPress={handlePress}
                onPress={() => navigation.navigate("recipe-screen/components/recipe-indi", { item })}
            >
                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 === 0 ? hp(20) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                /> */}
                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: index % 3 === 0 ? hp(20) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                />
                <Text style={{ fontSize: hp(1.5) }} className="font-semibold ml-2 text-neutral-400">
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </View>
    );
};

