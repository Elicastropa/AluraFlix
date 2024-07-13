import React from 'react';
import logo from '../../assets/logoAzul.svg';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onNewVideoClick, onHomeClick }) => {
  const navigate = useNavigate();

  const handleNewVideoClick = () => {
    onNewVideoClick();
    navigate('/');
  };

  return (
    <div className='navbar'>
      <img className='logoAzul' src={logo} alt="Logo" />
      <div className='botones'>
        <button onClick={onHomeClick}>HOME</button>
        <button onClick={handleNewVideoClick}>NUEVO VIDEO</button>
      </div>
    </div>
  );
};

export default Navbar;
