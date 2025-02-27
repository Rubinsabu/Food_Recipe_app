import React, { useEffect, useState,useContext } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import foodImg from '../assets/Corndogs.jpg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthContext } from '../context/AuthContext';
import Modal from './Modal';
import InputForm from './inputForm';

function Recipeitems() {
const allRecipes = useLoaderData()
const [Recipes,setRecipes]=useState()
let path = window.location.pathname === "/myRecipe" ? true:false
let favItems= JSON.parse(localStorage.getItem("fav")) ?? []
const [isFavRecipe,setIsFavRecipe]=useState(false)
const navigate = useNavigate()
const {isLogin} = useContext(AuthContext);
const [isOpen,setIsOpen] = useState(false); // State for login modal

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

const recipeDetails=(id)=>{

  if (!id || id.length !== 24) {
    console.error("Invalid recipe ID:", id);
    return;
  }
  if(isLogin){
    navigate(`/recipe/${id}`)
  }
  else{
    setIsOpen(true)
  }
}

  return (
    <>
      <div className='card-container'>
        {
            Recipes?.map((item,index)=>{
                return(
                    <div key={index} className='card' onClick={()=>recipeDetails(item._id)}>
                        <img src={`http://localhost:5000/images/${item.coverImage}`} width='120px' height='100px'></img>
                        <div className='card-body'>
                            <div className='title'>{item.title}</div>
                        
                        <div className='icons'>
                            <div className='timer'>
                                <BsStopwatchFill />{item.time}</div>     
                            {(!path) ? <FaHeart onClick={(event)=>{ event.stopPropagation();  favRecipe(item)}}
                              style={{color:(favItems.some(res => res._id === item._id)) ? "red": ""}}/> :
                            <div className='action'>
                              <Link to={`/editRecipe/${item._id}`} className='editIcon' onClick={(event) => event.stopPropagation()}><FaEdit /></Link> 
                              <MdDelete onClick={(event)=>{ event.stopPropagation(); onDelete(item._id)}} className='deleteIcon'/>
                            </div>
                            }            
                        </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
      { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}

export default Recipeitems
