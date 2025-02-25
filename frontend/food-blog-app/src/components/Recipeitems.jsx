import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import foodImg from '../assets/Corndogs.jpg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Recipeitems() {
const allRecipes = useLoaderData()
const [Recipes,setRecipes]=useState()
let path = window.location.pathname === "/myRecipe" ? true:false
let favItems= JSON.parse(localStorage.getItem("fav")) ?? []
const [isFavRecipe,setIsFavRecipe]=useState(false)

console.log(Recipes)

useEffect(()=>{
  setRecipes(allRecipes)
},[allRecipes])

const onDelete=async(id)=>{
    await axios.delete(`http://localhost:5000/recipe/${id}`)
      .then((res)=> console.log(res))
    setRecipes(allRecipes=>allRecipes.filter(allRecipes=>allRecipes._id !== id))
    let filterItem = favItems.filter(Recipes=>Recipes._id !== id)
    localStorage.setItem("fav",JSON.stringify(filterItem))
}

const favRecipe=(item)=>{
  let filterItem = favItems.filter(Recipes=>Recipes._id !== item._id)
  favItems=favItems.filter(Recipes=>Recipes._id === item._id ).length===0 ? [...favItems,item]: filterItem
  localStorage.setItem("fav",JSON.stringify(favItems))
  setIsFavRecipe(pre=>!pre)
}

  return (
    <>
      <div className='card-container'>
        {
            Recipes?.map((item,index)=>{
                return(
                    <div key={index} className='card'>
                        <img src={`http://localhost:5000/images/${item.coverImage}`} width='120px' height='100px'></img>
                        <div className='card-body'>
                            <div className='title'>{item.title}</div>
                        
                        <div className='icons'>
                            <div className='timer'>
                                <BsStopwatchFill />{item.time}</div>     
                            {(!path) ? <FaHeart onClick={()=>favRecipe(item)}
                              style={{color:(favItems.some(res => res._id === item._id)) ? "red": ""}}/> :
                            <div className='action'>
                              <Link to={`/editRecipe/${item._id}`} className='editIcon'><FaEdit /></Link> 
                              <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                            </div>
                            }            
                        </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </>
  )
}

export default Recipeitems
