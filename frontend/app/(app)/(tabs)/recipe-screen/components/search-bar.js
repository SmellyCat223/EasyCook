import React from 'react';
import { TextInput, View, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleClear = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <View className="p-3">
            <View className="flex-row items-center bg-white rounded-full p-2">
                <Icon name="search" size={24} color="#9CA3AF" style={{ marginRight: 3 }} />
                <TextInput
                    className="ml-2 flex-1 text-sm text-zinc-500"
                    placeholder="Search Recipe"
                    placeholderTextColor="#4B5563"
                    style={{ color: '#4B5563', fontSize: 17 }}
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={handleClear} style={{ marginRight: 10 }}>
                        <Icon name="close" type="antdesign" color="#6b7280" size={22} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Search;
