
import React, { useState } from "react";
import io from 'socket.io-client';
const item = JSON.parse(localStorage.getItem('user'));
console.log(item)
const AuthContext = React.createContext({
    email: (item && item.email)?item.email:'',
    userId: (item && item.userId)?item.userId:'',
    token: (item && item.token)?item.token:'',
    userIsLoggin: (item && item.userIsLoggin)?item.userIsLoggin:false,
    photoUrl: (item && item.photoUrl)?item.photoUrl:'',
    isLogout: (item && item.isLogout !== undefined && item.isLogout === false)?false:true,
    socket:io("http://localhost:3000"),
    userName: (item && item.userName)?item.userName:'',
    login: (token, email, localId) => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    let item = localStorage.getItem('user');
    console.log(item)
    const [token, setToken] = useState((item.token)?item.token:null);
    const [email, setEmail] = useState((item.email)?item.token:null);
    const [userId, setUserId] = useState((item.userId)?item.token:null);
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


