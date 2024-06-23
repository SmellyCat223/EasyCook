import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const categoryData = [
    { name: 'Full Meal', image: 'https://images.app.goo.gl/w3CuJfpz4Whizz98A' },
    { name: 'Desserts', image: 'https://images.app.goo.gl/emWTxzvPydaJiKWz7' },
    // Add more category objects as needed
];

export default function Categories() {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                {categoryData.map((cat, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.categoryItem}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: cat.image }}
                                    style={[styles.image, { width: hp(6), height: hp(6) }]} // Set the height to 10% of the screen height
                                />
                            </View>
                            <Text style={styles.text}>{cat.name}</Text>
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
