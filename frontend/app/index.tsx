// import 'react-native-url-polyfill/auto'
// import { useState, useEffect } from 'react'
// import { supabase } from './supabase'
// import App from './App'
// import { View, Text } from 'react-native'
// import { Session } from '@supabase/supabase-js'

// const Index = () => {
//     const [session, setSession] = useState<Session | null>(null)

//     useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session)
//         })

//         supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session)
//         })
//     }, [])

//     return (
//         <View className="flex-1 bg-red-500">
//             <App />
//         </View>
//     );
// };
// export default Index;

import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'expo-router';

const Index = () => {
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        if (session) {
            router.push('/(tabs)'); // or whatever your main page route is
        }
    }, [session]);

    if (!session) {
        return (
            <View className="flex-1 bg-red-500 justify-center items-center">
                <Text className="text-white">Loading...</Text>
            </View>
        );
    }

    return null; // or some initial view if needed
};

export default Index;
