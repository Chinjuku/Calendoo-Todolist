import React, { useState, createContext, useEffect } from "react"
import axios from "axios";
import { ListData } from "@/composables/apidata.types";
// import { UserContextProvider } from "./UserContext";
import { UserContext } from "./UserContext";
import { useContext } from "react";

type ListContextType = {
    list: ListData[] | null
    setList: React.Dispatch<React.SetStateAction<ListData[] | null>>
}

type ListContextProviderProps = {
    children: React.ReactNode
}

export const ListContext = createContext({} as ListContextType)

export const ListContextProvider = ({ children }: ListContextProviderProps) => {
    const userContext = useContext(UserContext)
    const [list, setList] = useState<ListData[] | null>(null)
    useEffect(() => {
        const showList = async () => {
            try {
                if (userContext.user?.id) {
                    const response = await axios.get(`http://localhost:8888/api/list/showlists/${userContext.user?.id}`);
                    const data = response.data
                    setList(data)
                }
            } catch (err) {
              console.error(err);
            }
        }
        showList()
    }, [userContext.user?.id]);
    return (
        // <UserContextProvider>
            <ListContext.Provider value={{ list, setList }}>
                {children}
            </ListContext.Provider>
        // </UserContextProvider>
    )
}