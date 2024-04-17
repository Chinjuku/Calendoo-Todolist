import React, { useState, createContext, useEffect } from "react"
import axios from "axios";
import { UserData } from "../Data.type";

type UserContextType = {
    user: UserData | null
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null)
    useEffect(() => {
        const showUser = async () => {
            try {
              const gettoken = localStorage.getItem('token');
              const response = await axios.get('http://localhost:8888/api/google-auth/refresh', {
                headers: {
                    Authorization: `Bearer ${gettoken}`,
                },
              });
              const data = response.data.user
              if (response.status === 403) {
                localStorage.removeItem('token');
                window.location.reload();
              }
              localStorage.setItem('token', response.data.refresh_token)
              setUser(data)
            } catch (err) {
              console.error(err);
            }
        }
        showUser()
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

