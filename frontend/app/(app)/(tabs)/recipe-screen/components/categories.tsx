import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface CategoriesProps {
    categories: { strCategory: string, strCategoryThumb: string }[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

export default function Categories({ categories, activeCategory, setActiveCategory }: CategoriesProps) {
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
                        let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/10';
                        return (
                            <TouchableOpacity key={index} onPress={() => setActiveCategory(cat.strCategory)} style={styles.categoryItem}>
                                <View style={[styles.imageContainer, { backgroundColor: activeButtonClass }]}>
                                    <Image
                                        source={{ uri: cat.strCategoryThumb }}
                                        style={[styles.image, { width: hp(6), height: hp(6) }]}
                                    />
                                </View>
                                <Text style={styles.text}>{cat.strCategory}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: 100, // Adjust the height as needed
    },
    contentContainer: {
        paddingHorizontal: 15,
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    imageContainer: {
        borderRadius: 999,
        padding: 6,
        backgroundColor: '#ccc',
    },
    image: {
        width: 50, // Adjust the width as needed
        borderRadius: 999,
    },
    text: {
        fontSize: 12, // Adjust the font size as needed
        color: 'white',
        marginTop: 4,
    },
});
