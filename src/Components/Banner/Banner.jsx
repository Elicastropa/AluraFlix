import React from 'react'
import 'typeface-roboto';
import './Banner.css';
import playerImage from '../../assets/player.jpg';

const Banner = () => {
  return (
    <>
    <div className='fondo'>
   <div className='bannerInfo'>
    <div className='datosBanner'>
    <h1>FRONT END</h1>
    <h2>Challenge React</h2>
    <p>Este challenge es una forma de aprendizaje. Es un mecanismo donde 
        podrás comprometerte en la resolución de un problema para poder 
        aplicar todos los conocimientos adquiridos en la formación React.</p>
    </div>
    <img src={playerImage} alt="Player" />
   </div>

   </div>
    </>
  )
}

export default Banner
