import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';

const UserAuthContext = createContext();

const UserAuthContextComponent = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser')
            setUser(data);
            setIsLoading(false);
        }
        loadUser();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <UserAuthContext.Provider value={{ user, setUser }}>
            {children}
        </UserAuthContext.Provider>
    )
}

const useUserAuth = () => useContext(UserAuthContext);

export { UserAuthContextComponent, useUserAuth };