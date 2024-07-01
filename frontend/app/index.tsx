import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import App from './App'
// import Auth from './components/Auth'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { UserProvider, useUser } from './UserContext'

const Index = () => {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <UserProvider>
            <View className="flex-1 bg-stone-950">
                {session && session.user && <Text>{session.user.id}</Text>}
                <App />
            </View>
        </UserProvider>
    );
};
export default Index;
