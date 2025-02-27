import React,{useContext, useState} from 'react'
import foodRecipe from '../assets/Corndogs.jpg'; 
import Modal from '../components/Modal';
import InputForm from '../components/inputForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Recipeitems from '../components/Recipeitems';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Home() {
  const navigate=useNavigate()
  const [isOpen,setIsOpen]=useState(false)
  const {isLogin} = useContext(AuthContext);

  const addRecipe=()=>{
    if(isLogin)
      navigate("/addRecipe")
    else
      setIsOpen(true)
  }
 
  return (
    <>
      <section className='home'>
        <div className='left'>
            <h1>Food Recipe</h1>
            <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h5>
            <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className='right'>
            <img src={foodRecipe} width="320px" height="300px" alt="Corndogs" />
        </div>
      </section>
      <div className='bg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,96L30,128C60,160,120,224,180,250.7C240,277,300,267,360,250.7C420,235,480,213,540,176C600,139,660,85,720,85.3C780,85,840,139,900,181.3C960,224,1020,256,1080,261.3C1140,267,1200,245,1260,229.3C1320,213,1380,203,1410,197.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
      </div>
      { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
      <div className='recipe'>
        <Recipeitems />
      </div>
    </>
  )
}

export default Home
