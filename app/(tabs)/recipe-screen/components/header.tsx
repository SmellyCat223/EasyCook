import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Recipe</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        color: '#f0f0f0',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;
