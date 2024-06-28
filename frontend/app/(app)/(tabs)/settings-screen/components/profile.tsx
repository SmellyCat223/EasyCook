import React, { useState } from 'react';
import { Text, View, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import { Link } from 'expo-router';
import ProfilePicture from '../../../../components/profile-picture';
import Avatar from './avatar';
import { supabase } from '../../../../supabase'

// const Profile = () => {
//     return (
//         <View className="flex-1 p-4 bg-stone-950">
//             <ProfilePicture />
//         </View>
//     );
// };

// export default Profile;

const Profile = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const updateProfile = async (data: { username: string, website: string, avatar_url: string }) => {
        try {
            // Update user profile with additional information
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    username: data.username,
                    website: data.website,
                    avatar_url: data.avatar_url,
                });

            if (error) {
                throw error;
            }

            // Optionally, you can handle any additional user data storage or UI navigation here.
        } catch (error: any) {
            console.error('Error updating profile:', error.message);
            // Handle error
        }
    };


    const username = 'exampleUsername';
    const website = 'exampleWebsite';

    return (
        <View>
            <View>
                <Avatar
                    size={200}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url);
                        updateProfile({ username, website, avatar_url: url });
                    }}
                />
            </View>
        </View>
    );
};
