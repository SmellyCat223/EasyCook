/* import React from 'react';
import { Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import { styled } from 'nativewind';

const Search = () => {
    return (
        <View className="p-1">
            <View className="flex-row items-center bg-white rounded-full p-2">
                <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
                <Text className="ml-2 flex-1 text-sm text-gray-600">Search Recipe</Text>
                <Icon name="filter" type="antdesign" color="#6b7280" size={16} className="ml-2" />
            </View>
        </View>
    );
};

export default Search;
*/

import React from 'react';
import { TextInput, View } from "react-native";
import { Icon } from 'react-native-elements';

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View className="p-1">
            <View className="flex-row items-center bg-white rounded-full p-2">
                <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
                <TextInput
                    className="ml-2 flex-1 text-sm text-gray-600"
                    placeholder="Search Recipe"
                    placeholderTextColor="#4B5563"
                    style={{ color: '#4B5563' }}
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                />
            </View>
        </View>
    );
};

export default Search;
