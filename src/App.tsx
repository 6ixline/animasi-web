import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="Apph-full">
      <header className='px-5 py-2'>
        <img src={logo} className="w-12" alt="logo"  />
      </header>
      <div className="crousel flex justify-center align-middle">
          <p>Main Body</p>
      </div>
    </div>
  );
}

export default App;
