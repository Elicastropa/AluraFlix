import React from 'react';
import './Footer.css';
import logo from '../../assets/logoAzul.svg';

const Footer = () => {
  return (
    <footer>
         <img className='logoAzul' src={logo} alt="Logo" />
         <p>Desarrollado por Elizabeth Castro</p>
    </footer>
  );
}


export default Footer;