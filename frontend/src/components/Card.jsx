import React from 'react';
import '../theme.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Card = (props) =>{
    return (
    <div class="card card-box rounded-5">
        <h1 class="park-name">{props.name}</h1>
        <img class="card-img" src={props.image}></img>
        <p>{props.hour}</p>
        <p>{props.state}</p>
        <p>{props.desc}</p>
        <p>{props.weather}°F</p>
        <br/>
    </div>
    );
};

export default Card