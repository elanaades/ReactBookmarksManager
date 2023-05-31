import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import PrivateRoute from './Components/PrivateRoute';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';
import Logout from './Pages/Logout';
import { UserAuthContextComponent } from './Components/UserAuthContext';

const App = () => {

    return (
        <UserAuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/mybookmarks' element={
                        <PrivateRoute>
                            <MyBookmarks />
                        </PrivateRoute>
                    } />
                    <Route exact path='/addbookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>
                    } />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </UserAuthContextComponent>
    );
}

export default App;