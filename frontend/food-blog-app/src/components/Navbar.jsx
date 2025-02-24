import React,{useState,useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import Modal from './Modal'
import InputForm from './inputForm'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const [isOpen,setIsOpen]=useState(false)
  const {isLogin,setIsLogin}= useContext(AuthContext)
  let user=JSON.parse(localStorage.getItem("user"))

  const checkLogin=()=>{
    if(isLogin){
      localStorage.removeItem("token") //To logout
      localStorage.removeItem("user")
      setIsLogin(false)
    }else{
      setIsOpen(true)
    }  
  }
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={()=>!isLogin && setIsOpen(true)}><NavLink to={ isLogin ? "/myRecipe":"/"}>My Recipe</NavLink></li>
            <li onClick={()=>!isLogin && setIsOpen(true)}><NavLink to={ isLogin ? "/favRecipe": "/"}>Favorites</NavLink></li>
            <li onClick={checkLogin}><p className='login'>{(isLogin) ? "Logout":"Login"}{user?.email ? `(${user?.email})`: ""}</p></li>
        </ul>   
      </header>
      { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}

export default Navbar
