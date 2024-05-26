import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';

const Search = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
                <Text style={styles.text}>Search Recipe</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    searchBar: {
        flexDirection: 'row',
        borderRadius: 20,
        padding: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    text: {
        marginLeft: 5,
        fontSize: 13,
        color: '#6b7280',
    },
});

export default Search;
