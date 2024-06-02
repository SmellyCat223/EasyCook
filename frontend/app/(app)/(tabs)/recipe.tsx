import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import RecipeScreen from "./recipe-screen/index_recipe";

const Recipe = () => {
  return (
    <View className="flex-1 bg-stone-950">
      <RecipeScreen />
    </View>
  )
}

export default Recipe;