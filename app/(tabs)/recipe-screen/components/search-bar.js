import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';

const Search = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Icon name="search1" type="antdesign" color="#6b7280" size={16} />
                <Text style={styles.text}>Search Recipe</Text>
                <Icon name="filter" type="antdesign" color="#6b7280" size={16} style={styles.filter} />
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
    },
    text: {
        flex: 1,
        marginLeft: 5,
        fontSize: 13,
        color: '#6b7280',
    },
    filter: {
        marginLeft: 10,
    }
});

export default Search;
