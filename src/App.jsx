import {useEffect, useState} from 'react';
import './App.css'

const App = () => {


  useEffect(() => {

    const btn = document.getElementById("add")
    const box = document.getElementById("box")

    function clickButton() {
      box.style.right = "200px"
      box.style.top = "200px"
      // left top right bottom
    }

    btn.addEventListener('click',clickButton)
    
  },[]);

  return (
    <div className="container" id="container">
      <button id="add">移動</button>
      <div className="box" id="box">
        
      </div>
    </div>
  );
};

export default App;
