import React from 'react';
import { Text, View, Image, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';

const recipes = [ // to get from database later on
    {
        name: "Oats with Berries",
        imageUrl: "https://laurenfitfoodie.com/wp-content/uploads/2023/06/mixed-berry-overnight-oats-07-scaled.jpg",
        instructions: [
            "1. In a bowl, combine the oats, milk, maple syrup, and vanilla extract.",
            "2. Cover and refrigerate for 4 hours.",
            "3. Stir the oat mixture.",
            "4. Top with fresh or frozen berries."
        ],
        ingredients: [
            "1. oats",
            "2. milk",
            "3. maple syrup",
        ]
    },
    {
        name: "Grilled Chicken Salad with Tomatoes",
        imageUrl: "https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        instructions: [
            "1. In a bowl, combine the grilled chicken, tomatoes, lettuce, and dressing.",
            "2. Toss to combine.",
            "3. Serve chilled."
        ],
        ingredients: [
            "1. chicken",
            "2. lettuce",
            "3. cabbage",
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
        ],
        ingredients: [
            "1. pork belly",
            "2. soy sauce",
            "3. sugar",
        ]
    }
];

const RecipeA = ({ name, imageUrl, instructions, ingredients }) => {
    const handleDelete = () => { // for backend
        // Add delete functionality here
        console.log(`Delete recipe: ${name}`);
    };

    return (
        <View className="p-1">
            <View className="p-3 bg-yellow-100 rounded-lg">
                <View className="flex-row">
                    <View className="mr-3">
                        <View className="p-0.5 border-2 border-black rounded-full">
                            <View className="p-0.5 border-2 border-black rounded-full overflow-hidden">
                                <Image
                                    source={{ uri: imageUrl }}
                                    className="w-24 h-24 rounded-full"
                                />
                            </View>
                        </View>
                        <View className="mt-2 ml-2">
                            <Text className="text-s text-gray-800 mt-2">Ingredients:</Text>
                            {ingredients.map((ingredient, index) => (
                                <Text key={index} className="text-xs text-gray-700 mt-1">{ingredient}</Text>
                            ))}
                        </View>
                    </View>
                    <View className="flex-1">
                        <View className="flex-row mt-2">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <Icon key={index} name="star" type="font-awesome" color="gold" size={20} />
                            ))}
                        </View>
                        <Text className="text-xl font-bold text-darkred mt-2">{name}</Text>
                        {instructions.map((instruction, index) => (
                            <Text key={index} className="text-sm mt-1">{instruction}</Text>
                        ))}
                        <View className="flex-row mt-2 justify-end">
                            <Icon name="edit" type="antdesign" size={20} className="ml-2" />
                            <Icon name="delete" type="material" size={20} className="ml-2" />
                        </View>
                    </View>
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
                    ingredients={recipe.ingredients}
                />
            ))}
            <View className="p-1">
                <View className="p-5 bg-yellow-100 rounded-lg">
                    <Icon name="plus" type="font-awesome" color="black" />
                </View>
            </View>
        </ScrollView>
    );
};

export default RecipeScreen;
