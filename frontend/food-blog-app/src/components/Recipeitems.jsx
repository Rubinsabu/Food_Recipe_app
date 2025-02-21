import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import foodImg from '../assets/Corndogs.jpg'

function Recipeitems() {
const allRecipes = useLoaderData()
console.log(allRecipes)
  return (
    <>
      <div className='card-container'>
        {
            allRecipes?.map((item,index)=>{
                return(
                    <div key={index} className='card'>
                        <img src={foodImg} width='120px' height='100px'></img>
                        <div className='card-body'>
                            <div className='title'>{item.title}</div>
                        
                        <div className='icons'>
                            <div className='timer'>
                                <BsStopwatchFill />30 mins</div>     
                            <FaHeart />                   
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
