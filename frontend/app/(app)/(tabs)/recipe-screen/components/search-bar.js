import React from 'react';
import { TextInput, View } from "react-native";
import { Icon } from 'react-native-elements';

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View className="p-3">
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
