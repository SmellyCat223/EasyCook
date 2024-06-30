import React from 'react';
import { View, TextInput } from "react-native";
import { Icon } from 'react-native-elements';

type FilterProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Filter: React.FC<FilterProps> = ({ setSearchQuery }: FilterProps) => {

    return (
        <View className="flex flex-row py-2 justify-between">
            <View className="flex flex-row rounded-2xl p-2 w-60 bg-zinc-200">
                <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
                <TextInput
                    className="text-zinc-500 ml-2"
                    placeholder="Search Item"
                    placeholderTextColor="#44403c"
                    onChangeText={(text: string) => setSearchQuery(text)}
                />
            </View>
            <Icon name="filter" type="antdesign" color="#e4e4e7" />
        </View>
    );
};

export default Filter;