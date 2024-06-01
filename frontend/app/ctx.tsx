import React from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';

const AuthContext = React.createContext<{
  // signIn: () => void;
  signIn: (email: string, password: string) => void;
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

// export function SessionProvider(props: React.PropsWithChildren) {
//   const [[isLoading, session], setSession] = useStorageState('session');

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: () => {
//           // Perform sign-in logic here
//           setSession('xxx');
//         },
//         signOut: () => {
//           setSession(null);
//         },
//         session,
//         isLoading,
//       }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (email: string, password: string) => {
    try {
      // Set loading state
      // setSession([true, session]);
      setSession(null);

      // Make a POST request to your backend endpoint
      const response = await axios.post('http://192.168.4.13:3000/api/user/login', { email, password });

      // Handle the response
      if (response.status === 200) {
        // Assuming the server returns a session token upon successful login
        // setSession([false, response.data.sessionToken]);
        setSession(response.data.sessionToken);
      } else {
        // Handle non-200 responses
        // setSession([false, null]);
        setSession(null);
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      // Handle errors
      // setSession([false, null]);
      setSession(null);
      console.error('Login error:', error);
    }
  };

  const signOut = () => {
    // setSession([false, null]);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
