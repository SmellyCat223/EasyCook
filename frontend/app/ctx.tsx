import React from 'react';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';
// import Home from './(auth)/index';
// import { useNavigation, ParamListBase } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');

          // // Navigate to the homepage after signing in
          // router.push('/about');
          // navigation.navigate('Home');
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
