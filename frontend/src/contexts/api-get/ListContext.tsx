import React, { useState, createContext, useEffect } from "react"
import axios from "axios";
import { ListData } from "../Data.type";
import { UserContext, UserContextProvider } from "./UserContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

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
    const { data: alllists } = useQuery({
        queryKey: ['alllists'],
        queryFn: async () => {
            if (userContext.user?.id) {
                const response = await axios.get(`http://localhost:8888/api/list/showlists/${userContext.user?.id}`)
                return response.data
            }
            return null
        },
        enabled: !!userContext.user?.id,
    })
    useEffect(() => {
        if (alllists) {
            setList(alllists)
        }
    }, [alllists]);
    console.log(list)
    return (
        <UserContextProvider>
            <ListContext.Provider value={{ list, setList }}>
                {children}
            </ListContext.Provider>
        </UserContextProvider>
    )
}