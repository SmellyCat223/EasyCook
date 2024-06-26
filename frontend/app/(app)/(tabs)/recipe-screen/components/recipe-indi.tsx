import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface RecipeDetailScreenProps {
    route: any;
    props: any;
}

export default function RecipeDetailScreen() {
// const RecipeDetailScreen: React.FC<{ route: { params: { item: Meal } } }> = ({ route }) => {
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




