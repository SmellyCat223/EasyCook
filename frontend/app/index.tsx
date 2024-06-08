import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import App from './App'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'

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
    <View className="flex-1 justify-center items-center bg-stone-950">
      <App />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
};

export default Index;