"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState, createContext } from "react"

// 1. Create the context
export const UserDetailContext = createContext();

function Provider({ children }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        if (user) CreateNewUser();
    }, [user]);

    const CreateNewUser = async () => {
        try {
            const result = await axios.post("/api/user", {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress
            });
            console.log(result.data);
            setUserDetail(result.data);
        } catch (err) {
            console.error("Error creating user:", err);
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider;