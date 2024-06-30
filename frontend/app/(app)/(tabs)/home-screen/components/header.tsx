// import React from 'react';
// import { View, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { useUser } from '../../../../UserContext';

// const Header = ({ username }: { username: string | null }) => {

//     return (
//         <View className="flex flex-row justify-between p-4">
//             <View>
//                 <View className="flex flex-row">
//                     <Text className="text-zinc-100">Hi {username} </Text>
//                     <Icon name="waving-hand" type="materialicons" color="#fef08a" size={16} />
//                 </View>
//                 <Text className="text-zinc-100">Welcome back!</Text>
//             </View>
//         </View>
//     );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { supabase } from '../../../../supabase'; // Adjust path as per your project structure
import { AnyObject } from 'yup';

const Header = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

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
            console.log(userId);
            fetchUsername(userId);
        }
    }, [userId]);

    const fetchUsername = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching username:', error.message);
            } else if (data) {
                setUsername(data.username);
            }
        } catch (error: any) {
            console.error('Error fetching username:', error.message);
        }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text className="text-zinc-100">Hi {username ? username : 'Guest'} </Text>
                    <Icon name="waving-hand" type="materialicons" color="#fef08a" size={16} />
                </View>
                <Text className="text-zinc-100">Welcome back!</Text>
            </View>
        </View>
    );
};

export default Header;
