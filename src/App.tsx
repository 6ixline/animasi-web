import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App bg-black h-full">
      <header className='px-5 py-2'>
        <img src={logo} className="w-12" alt="logo"  />
      </header>
    </div>
  );
}

export default App;
