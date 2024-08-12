import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { supabase } from '../../../../supabase';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

const Profile = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [originalUsername, setOriginalUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                setUserId(data.session.user.id);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchProfileData(userId);
        }
    }, [userId]);

    const fetchProfileData = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, password, email, profile_picture')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error.message);
            } else if (data) {
                setUsername(data.username);
                setOriginalUsername(data.username);
                setPassword(data.password);
                setEmail(data.email);
                setImageUri(data.profile_picture);
            }
        } catch (error: any) {
            console.error('Error fetching profile:', error.message);
        }
    };

    const updateProfile = async () => {
        try {
            // Input validation
            if (!username || username === originalUsername) {
                Alert.alert('Please choose a new username.');
                return;
            }

            if (password && password.length < 6) {
                Alert.alert('Password must be at least 6 characters long.');
                return;
            }

            // Update user profile in the `profiles` table
            if (userId) {
                // Update profile in the `profiles` table
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({ username, profile_picture: imageUri, password })
                    .eq('id', userId);

                if (profileError) {
                    console.error('Error updating profile:', profileError.message);
                    Alert.alert('Failed to update profile');
                    return;
                }

                // If password is provided, update it in the Supabase Auth system
                if (password) {
                    const { error: authError } = await supabase.auth.updateUser({
                        password,
                    });

                    if (authError) {
                        console.error('Error updating password:', authError.message);
                        Alert.alert('Failed to update password');
                        return;
                    }
                }

                Alert.alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
            Alert.alert('Failed to update profile');
        }
    };


    // const pickImage = async () => {
    //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (permissionResult.granted === false) {
    //         Alert.alert('Permission to access camera roll is required!');
    //         return;
    //     }

    //     const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: false,
    //         aspect: [4, 3],
    //         quality: 0.7,
    //     });

    //     if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
    //         const asset = pickerResult.assets[0];
    //         const uri = asset.uri;

    //         if (uri) {
    //             setImageUri(uri);
    //             uploadImage(uri); // Pass URI to upload function
    //         } else {
    //             Alert.alert('Failed to get image URI');
    //         }
    //     } else {
    //         Alert.alert('Image selection was canceled or failed');
    //     }
    // };

    // const uploadImage = async (uri: string) => {
    //     try {
    //         // Fetch the image from URI
    //         const response = await fetch(uri);

    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch image: ${response.statusText}`);
    //         }

    //         const blob = await response.blob();

    //         if (!blob || blob.size === 0) {
    //             throw new Error('Blob is empty');
    //         }

    //         const fileName = `${userId}.${blob.type.split('/')[1]}`; // Get file extension from MIME type

    //         // Upload the image directly using the Blob object
    //         const { data, error } = await supabase
    //             .storage
    //             .from('avatars')
    //             .upload(fileName, blob, {
    //                 contentType: blob.type,
    //                 cacheControl: '3600',
    //                 upsert: true
    //             });

    //         console.log('Image URI:', uri);
    //         console.log('Blob object:', blob);
    //         console.log('Blob type:', blob.type);
    //         console.log('Blob size:', blob.size);

    //         // Log response and errors
    //         console.log('Upload response:', data);
    //         console.error('Upload error:', error);

    //         if (error) {
    //             console.log('Error uploading image:', error.message);
    //             Alert.alert('Failed to upload image');
    //         } else {
    //             // Correctly access publicUrl from the response
    //             const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
    //             if (publicUrl) {
    //                 setImageUri(publicUrl);
    //             } else {
    //                 throw new Error('Failed to get public URL for uploaded image');
    //             }
    //         }
    //     } catch (error) {
    //         console.log('Error uploading image:', error.message);
    //         Alert.alert('Failed to upload image');
    //     }
    // };





    return (
        <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-stone-950 flex-1">
            <View className="items-center mb-8">
                <TouchableOpacity>
                    <Image
                        source={{ uri: imageUri || 'https://i.pinimg.com/564x/af/64/49/af6449c9ece35104f7e351c0c6f8c132.jpg' }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                    {/* <Icon name="edit" type="material" color="#fff" containerStyle={{ position: 'absolute', bottom: 0, right: 0 }} /> */}
                </TouchableOpacity>
                <Text className="text-white text-lg mt-4 font-bold">{username || 'Guest'}</Text>
                <Text className="text-gray-400">{email || 'guest@example.com'}</Text>
            </View>

            <View className="space-y-4">
                <Text className="text-white text-base">Update your particulars</Text>

                <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 mb-2"
                    placeholder="Username"
                    placeholderTextColor="#44403c"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 mb-2"
                    placeholder="Password"
                    placeholderTextColor="#44403c"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    onPress={updateProfile}
                    className="bg-green-500 p-3 rounded-full items-center mb-2"
                >
                    <Text className="text-white font-bold">Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Profile;
