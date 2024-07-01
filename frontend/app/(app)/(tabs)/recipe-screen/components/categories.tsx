import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from './image';

interface CategoriesProps {
    categories: { strCategory: string, strCategoryThumb: string }[];
    activeCategory: string;
    handleChangeCategory: (category: string) => void;
}

export default function Categories({ categories, activeCategory, handleChangeCategory }: CategoriesProps) {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                {categories.map((cat, index) => {
                    let isActive = cat.strCategory === activeCategory;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChangeCategory(cat.strCategory)}
                            style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
                        >
                            <View style={[styles.imageContainer, isActive && styles.activeImageContainer]}>
                                <CachedImage
                                    uri={cat.strCategoryThumb}
                                    style={[styles.image, { width: hp(6), height: hp(6) }]}
                                />
                            </View>
                            <Text style={[styles.text, isActive && styles.activeText]}>{cat.strCategory}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: 80,
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        padding: 2,
        borderRadius: 999,
        backgroundColor: 'black', // Default background color
    },
    activeCategoryItem: {
        backgroundColor: 'white', // Active background color
    },
    imageContainer: {
        borderRadius: 50,
    },
    activeImageContainer: {
        backgroundColor: 'white',
    },
    image: {
        borderRadius: 999,
    },
    text: {
        fontSize: 12,
        color: 'white',
    },
    activeText: {
        color: 'black',
    },
});
