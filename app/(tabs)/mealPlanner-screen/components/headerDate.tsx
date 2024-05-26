import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <Text style={styles.text}>20 May - 26 May</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#f0f0f0',
        fontSize: 23,
        fontWeight: 'bold',
    },
});

export default Header;
