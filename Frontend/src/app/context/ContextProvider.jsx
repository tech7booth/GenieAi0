'use client'
import { useEffect, useState } from "react"
import { UserContext } from "./Context"
import axios from "axios";
import {USER_INFO} from "@/utils/apiRoutes"

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    useEffect(() => {
        if (!user) {
            const token = cookieStore.get('token')
            console.log('toka toka token', token);
            axios.get(USER_INFO, {withCredentials:true, headers:{
                "Authorization":token?.value
            }}).then(res => {
                setUser(res.data.data);
            }).catch(err => {
                console.log(err);
            })
        }
    })
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
} 