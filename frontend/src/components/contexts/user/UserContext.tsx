import React, { useState, createContext, useEffect } from "react"
import { showUser } from "@/api/get/showUserAuth";
import { UserData } from "@/composables/apidata.types";

type UserContextType = {
    user: UserData | undefined | null
    setUser: React.Dispatch<React.SetStateAction<UserData | undefined | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<UserData | undefined | null>(null)
    useEffect(() => {
      const fetchData = async () => {
        const fetchedData = await showUser();
        setUser(fetchedData);
      };
      fetchData();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

