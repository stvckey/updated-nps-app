import { useState, useEffect } from 'react'
import './theme.css';
import Info from './Info';
import Form from './components/Form.js'
import Card from './components/Card'
import MapComponent from "./Map.jsx"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import cat from './static/icons8-cat-profile-64.png'
import mountain from './static/icons8-mountain-64.png'

function App() {

  const [data, setData] = useState({})
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async ()=>{
    try{
      const response = await fetch('http://127.0.0.1:5000/')
      const jsonData = await response.json();
      setData(jsonData)
    } catch(error){
      console.log('Error', error)
    }
  }

  const total_states = data["total_states"]
  console.log(total_states)

  let count = 0;
  for (let states in total_states){
    count++
  }

  const choices = []

  for (let i = 0; i < count; i++) {
    const choice = 
      <li><a id="chosen_state" class="dropdown-item"
        onClick={async () => {
          const chosen_state = total_states[i][0];
          const response = await fetch("http://127.0.0.1:5000/choose_state", {
            method: "POST",
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(chosen_state)
          })
          if (response.ok){
            console.log("It works")
          }
        }} 
        value={total_states[i][0]}>{total_states[i][1]}
      </a></li>;
    choices.push(choice);
  }

  return (
    <div className="body">

      <div className = "header">
        <h1 className = "logo">
          <img src={mountain} />  
          HIKEU
        </h1>
        <div className = "profile">
          <img src={cat} />
        </div>
      </div>

      <div className="filters">
        <Form />
      </div>

      <div className="page">

        <div class="content shadow shadow-offset-left-xl">
          <div class ="results">

            <Info />

          </div>
          
        </div>

      <div class="map">
        <MapComponent/>
      </div>
      </div>


      <div class = "feed shadow-lg">
        <h1 class="feed-info-box">The feed will go here!</h1>
        <h1 class="feed-info-box">The feed will go here!</h1>
        <h1 class="feed-info-box">The feed will go here!</h1>
        <h1 class="feed-info-box">The feed will go here!</h1>
      </div>


    </div>
  );
}

export default App;
