import { useState, useEffect } from 'react'
import Card from './components/Card'
import './theme.css'



function Info() {

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

  const coords = data["coord"]
  const descs = data["desc"]
  const hours = data["hours"]
  const names = data["names"]
  const states = data["state"]
  const weathers = (data["weather"])
  const image = data["image"]

  let count = 0;
  for (let park in coords){
    count++
  }

  const allParks = []

  for (let i = 0; i < count; i++) {
    const component = <Card
      image ={image[i]}
      hour ={Object.keys(hours[i])}
      weather={weathers[i].slice(10,15)} 
      state={states[i]} 
      name={names[i]}
      />;
    allParks.push(component);
  }

  

  return (
    <div className="App">
      {allParks}
    </div>
  );
}


export default Info;
