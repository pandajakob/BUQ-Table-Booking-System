import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Auth } from './components/auth';
import { Restaurant } from './components/restaurant';


function App() {
  return  <div className="App">
            <div className='auth'> <Auth />   </div>
            <div className='Restaurant'> <Restaurant /> </div>
          </div>
}

export default App;
