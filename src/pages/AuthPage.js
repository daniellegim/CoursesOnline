import AuthForm from '../components/Auth/AuthForm';
import AuthContext from "../store/auth-context"
import { useState , useRef, useContext } from 'react';

const AuthPage = () => {
  const authCtx = useContext (AuthContext); 
  return <AuthForm Logout={authCtx.isLogout} />;
};

export default AuthPage;
