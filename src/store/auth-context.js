
import React, { useState } from "react";
import io from 'socket.io-client';
const AuthContext = React.createContext({
    email: '',
    userId: '',
    token: '',
    userIsLoggin: false,
    photoUrl: '',
    isLogout: true,
    socket:io("http://localhost:3000"),
    userName: '',
    login: (token, email, localId) => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userIsLoggin, setIsLogin] = useState(!!token);

    const loginHandler = (token, email, localId) => {
        setToken(token);
        setEmail(email)
        setUserId(localId)
        setIsLogin(true);
        
        console.log(userIsLoggin)
    }
    const logoutHandler = () => {
        setToken(null);
        setIsLogin(false);
        console.log(userIsLoggin)
    }

    const contextValue = {
        token: token,
        userIsLoggin: userIsLoggin,
        login: loginHandler,
        logout: logoutHandler,
        email: email,
        userId: userId
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext;


