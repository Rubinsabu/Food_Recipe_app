import {createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    const [isLogin,setIsLogin] = useState(!!localStorage.getItem('token'));

    useEffect(()=>{
        const checkAuth = () => {
            setIsLogin(!!localStorage.getItem("token"));
        }
        console.log("AuthContext Triggered...")
        window.addEventListener("storage",checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    },[]);

    return(
        <AuthContext.Provider value={{isLogin,setIsLogin}}>
            {children}
        </AuthContext.Provider>
    );
}