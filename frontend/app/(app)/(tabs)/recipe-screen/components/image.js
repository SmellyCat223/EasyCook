import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from "react-native-reanimated";


export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                // Check if the image is already cached
                const cachedImageData = await AsyncStorage.getItem(uri);

                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    // Fetch the image from the network
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();

                    // Convert blob to base64
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });

                    // Store base64 image in AsyncStorage
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setCachedSource(null); // Fallback to the original URI if caching fails
            }
        };

        getCachedImage();
    }, [uri]);

    return (
        <Animated.Image source={cachedSource} {...props} />
    );
};
