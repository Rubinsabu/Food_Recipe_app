import React from 'react'
import { useLoaderData } from 'react-router-dom'
import profileImg from '../assets/profile.png'

function RecipeDetails() {

    const recipe = useLoaderData()
    console.log(recipe)
  return (
    <>
        <div className='outer-container'>
            <div className='profile'>
                <img src={profileImg} width="50px" height="50px"></img>
                <h5>{recipe.email}</h5>
            </div>
            <h3 className='title'>{recipe.title}</h3>
            <img src={`http://localhost:5000/images/${recipe.coverImage}`} width="220px" height="200px"></img>
            <div className='recipe-details'>
                <div className='ingredients'><h4>Ingredients</h4><ul>{recipe.ingredients.map(item=>(<li>{item}</li>))}</ul></div>
                <div className='instructions'><h4>Instructions</h4><span>{recipe.instructions}</span></div>
            </div>
        </div>
    </>
  )
}

export default RecipeDetails
