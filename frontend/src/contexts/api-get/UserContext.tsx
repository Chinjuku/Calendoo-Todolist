import React, { useState, createContext, useEffect } from "react"
import axios from "axios";
import { UserData } from "@/composables/apidata.types";

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
              const response = await axios.get('http://localhost:8888/api/google-auth/getuser', {
                headers: {
                    Authorization: `Bearer ${gettoken}`,
                },
              });
              const data = response.data.user
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

