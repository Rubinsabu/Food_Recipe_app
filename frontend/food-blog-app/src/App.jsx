import React from 'react'
import "./App.css"
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext'

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:5000/recipe').then(res=>{
    allRecipes = res.data
  })
  return allRecipes
}

const router = createBrowserRouter([
  { path:"/",element:<MainNavigation/>, 
    children:[
    {path:"/",element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home/>},
    {path:"/favRecipe",element:<Home/>},
    {path:"/addRecipe",element:<AddFoodRecipe/>}
  ]}
])

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  )
}

export default App
