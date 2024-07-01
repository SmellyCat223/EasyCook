import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, Linking, ImageBackground } from 'react-native';
import axios from 'axios';

const Article = () => {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = async () => {
        const apiKey = '3dba596a18a04418b792ce9981391ae6';
        const keywords = 'eat healthy'; // Modify keywords as needed
        const apiUrl = `https://newsapi.org/v2/top-headlines?q=${keywords}&apiKey=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.articles && response.data.articles.length > 0) {
                const firstArticle = response.data.articles[0];
                // Truncate description to 75 characters
                if (firstArticle.description && firstArticle.description.length > 75) {
                    firstArticle.description = firstArticle.description.substring(0, 75) + '... Read More';
                }
                setArticle(firstArticle);
            } else {
                setArticle(null);
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            Alert.alert('Error', 'Failed to fetch article. Please try again later.');
        }
    };

    const openArticle = () => {
        if (article && article.url) {
            Linking.openURL(article.url);
        } else {
            Alert.alert('Article Not Available', 'No article to open.');
        }
    };

    return (
        <TouchableOpacity onPress={openArticle}>
            <ImageBackground
                source={article ? { uri: article.urlToImage } : null}
                style={{
                    borderRadius: 20,
                    padding: 16,
                    backgroundColor: '#f0f0f0',
                    overflow: 'hidden',
                }}
                imageStyle={{ borderRadius: 20, opacity: 0.3 }}
            >
                <View>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Article of the day</Text>
                    {article ? (
                        <>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{article.title}</Text>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>{article.description}</Text>
                        </>
                    ) : (
                        <Text style={{ color: '#fff' }}>No article found</Text>
                    )}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default Article;
