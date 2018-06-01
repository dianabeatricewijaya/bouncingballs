import React from 'react';
import './Ball.css';



const Ball = props =>{
    const {color,xAxis,yAxis,ballSize,onClick} = props;
    return(
    <div 
        className="ball"
        onClick={onClick(color)}
        style={{
            backgroundColor :`${color}`,
            left: `${xAxis}px`,
            bottom: `${yAxis}px`,
            height: `${ballSize}px`,
            width: `${ballSize}px`
    }}/>
    )
}

export default Ball;
