import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserContextType {
    username: string | null;
    setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        console.log('UserProvider - username:', username);
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    console.log('useUser - context:', context);
    return context;
};
