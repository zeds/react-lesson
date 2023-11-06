import React, { createContext, useContext, useState, ReactNode } from 'react';

const UserContext = createContext<{ userName: string, setUserName: (name: string) => void } | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
