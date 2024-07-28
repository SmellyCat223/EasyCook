import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

type FilterProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Filter: React.FC<FilterProps> = ({ setSearchQuery }: FilterProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleClearInput = () => {
        setInputValue('');
        setSearchQuery('');
    };

    const handleTextChange = (text: string) => {
        setInputValue(text);
        setSearchQuery(text);
    };

    return (
        <View className="p-0">
            <View className="flex-row items-center bg-white rounded-full p-2">
                <Icon name="search" size={24} color="#9CA3AF" style={{ marginRight: 3 }} />
                <TextInput
                    className="text-zinc-500 ml-2 flex-1"
                    placeholder="Search Item"
                    placeholderTextColor="#44403c"
                    value={inputValue}
                    onChangeText={handleTextChange}
                />
                {inputValue.length > 0 && (
                    <TouchableOpacity onPress={handleClearInput}>
                        <Icon name="close" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Filter;