import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import Search from "./components/search-bar";
import Categories from './components/categories';
import Recipes from './components/recipes';
import axios from 'axios';

const RecipeScreen = () => {

    const [activeCategory, setActiveCategory] = useState('Desserts');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, [])

    const handleChangeCategory = (category: string) => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (err: any) {
            console.log('error: ', err.message);
        }
    }

    const getRecipes = async (category = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            // console.log('got recipes: ', response.data);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (err: any) {
            console.log('error: ', err.message);
        }
    }

    const searchRecipes = async (query: string) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (err: any) {
            console.log('error: ', err.message);
        }
    };


    return (
        <View className="flex-1 pt-1 bg-stone-950">

            <Search onSearch={searchRecipes} />
            <View>
                {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
            </View>
            <ScrollView className="flex-grow">
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView >
        </View >
    );
};

export default RecipeScreen;
