import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(''); // Inicialmente, definimos como 'user'

  const login = (type) => {
    setUserType(type); // Altera o tipo de usuário com base no argumento
  };

  return (
    <AuthContext.Provider value={{ userType, login }}>
      {children}
    </AuthContext.Provider>
  );
};
