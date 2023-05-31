import React, { useEffect } from 'react';
import axios from 'axios';
import { useUserAuth } from '../Components/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { setUser } = useUserAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const doLogout = async () => {
            await axios.post('/api/account/logout');
            setUser(null);
            navigate('/');
        }
        doLogout();
    }, []);

    return (<></>);
}

export default Logout;