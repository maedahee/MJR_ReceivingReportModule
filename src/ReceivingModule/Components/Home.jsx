// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

 import Navbar from './NavBarAndFooter/navbar.jsx';
 import Footer from './NavBarAndFooter/navbar.jsx';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => navigate('/new-entry')}
        >
          <span style={iconStyle}>+</span> New Entry
        </button>
        <button
          style={{ ...buttonStyle, marginTop: '1.5rem' }}
          onClick={() => navigate('/update-entry')}
        >
          <span style={iconStyle}>&#8635;</span> Update Entry
        </button>
      </div>
      <Footer />
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: 'transparent',
};

const buttonContainerStyle = {
  marginTop: '2rem',
  textAlign: 'center',
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1A202C',
  color: '#FFF',
  border: 'none',
  borderRadius: '25px',
  padding: '1.2rem 2rem',
  fontSize: '1.5rem',
  cursor: 'pointer',
  width: '600px',
  fontFamily: 'Arial, sans-serif',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const iconStyle = {
  marginRight: '10px',
  fontSize: '1.8rem',
};

export default Home;
