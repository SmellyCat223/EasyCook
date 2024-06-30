/* import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function RecipeDetailScreen(props) {
    console.log(props.route.params);
    // const { item } = route.params;
    // const [isFavourite, setIsFavourite] = useState(false);

    return (
        // <ScrollView className="bg-black flex-1" showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        //     <StatusBar style={"light"} />

        //     <View className="flex-row justify-center">
        //         <Image
        //             source={{ uri: item.strMealThumb }}
        //             style={{ width: wp(98), height: hp(50), borderRadius: 53, marginTop: 4 }}
        //         />
        //     </View>

        //     <View className="w-full absolute flex-row justify-between items-center pt-14">
        //         <TouchableOpacity className="p-2 rounded-full ml-5 bg-white">
        //             <Icon name="chevron-left" type="material" size={hp(3.5)} color="black" />
        //         </TouchableOpacity>

        //         <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
        //             <MaterialIcons name="favorite" size={24} color={isFavourite ? "red" : "grey"} />
        //         </TouchableOpacity>
        //     </View>
        // </ScrollView>
        <View><Text>RecipeDetailScreen</Text></View>
    )
}

*/
import React from 'react';
import { View, Text, Image } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
    const { strMealThumb, strMeal } = route.params; // Destructure the parameters from route.params

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: strMealThumb }} style={{ width: 200, height: 200, borderRadius: 100 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>{strMeal}</Text>
            {/* Add more details here if needed */}
        </View>
    );
};

export default RecipeDetailScreen;



