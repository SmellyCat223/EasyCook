import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

const recipes = [
    {
        name: "Oats with Berries",
        imageUrl: "https://laurenfitfoodie.com/wp-content/uploads/2023/06/mixed-berry-overnight-oats-07-scaled.jpg",
        instructions: [
            "1. In a bowl, combine the oats, milk, maple syrup, and vanilla extract.",
            "2. Cover and refrigerate for 4 hours.",
            "3. Stir the oat mixture.",
            "4. Top with fresh or frozen berries."
        ]
    },
    {
        name: "Grilled Chicken Salad with Tomatoes",
        imageUrl: "https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        instructions: [
            "1. In a bowl, combine the grilled chicken, tomatoes, lettuce, and dressing.",
            "2. Toss to combine.",
            "3. Serve chilled."
        ]
    },
    {
        name: "ChaShu Ramen",
        imageUrl: "https://www.shutterstock.com/image-photo/shoyu-ramen-gray-bowl-on-600nw-1921881938.jpg",
        instructions: [
            "1. Roll pork belly tightly into a cylinder and tie with string.",
            "2. Mix soy sauce, sugar, mirin, sake, and water in a bowl.",
            "3. Preheat oven to 120°C/250°F.",
            "4. Sear pork in oil in a pan, then add soy sauce mixture, ginger, garlic, and extra water.",
            "5. Cook covered in oven for 3 hours, turning every 30 minutes.",
            "6. Let pork and liquid cool, then refrigerate overnight.",
            "7. Remove fat from liquid and slice pork.",
            "8. Heat slices in a pan before serving with ramen or rice."
        ]
    }
];

const RecipeA = ({ name, imageUrl, instructions }) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.doubleBorder}>
                    <View style={styles.singleBorder}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{name}</Text>
                    {instructions.map((instruction, index) => (
                        <Text key={index} style={styles.writeup}>{instruction}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const RecipeScreen = () => {
    return (
        <ScrollView>
            {recipes.map((recipe, index) => (
                <RecipeA
                    key={index}
                    name={recipe.name}
                    imageUrl={recipe.imageUrl}
                    instructions={recipe.instructions}
                />
            ))}
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="plus" type="font-awesome" color="black" />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },

    innerContainer: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'rgba(253, 243, 217, 0.8)',
        alignItems: 'center',
    },

    doubleBorder: {
        padding: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 100,
    },
    singleBorder: {
        padding: 3,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 100,
    },
    textContainer: {
        flex: 1,
        marginLeft: 13,
    },
    heading: {
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Oblique',
        color: 'darkred',
        lineHeight: 27,
    },
    writeup: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Helvetica',
        lineHeight: 20,
    },
    iconContainer: {
        flex: 1,
        paddingVertical: 20,
    },
});

export default RecipeScreen;
