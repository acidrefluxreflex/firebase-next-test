import { createContext, useEffect, useState, useContext } from "react";
import { User } from "../common/User";
import React from 'react';
import { onAuthStateChanged } from "../firebase/auth";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

type AuthProps = {
    children: React.ReactNode; // 👈️ type children
  };

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider = (props: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    onAuthStateChanged((user) => {
      // ログイン状態が変化すると呼ばれる
      setCurrentUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
