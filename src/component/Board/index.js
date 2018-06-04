import React, {Component} from 'react';
import './Board.css';
import Ball from '../Ball';
import {randomIntFromInterval, colorsCollection} from '../../helpers';

let timer;

class Board extends Component{
    state = {
        balls : [],
        speed : 200,
        intervalId:null,
        colors:colorsCollection()
    }

    componentDidMount(){
        this.addBall();
        this.setState({intervalId: this.bounceAllBalls(200)});
    }
    
    componentWillUnmount(){
        clearInterval(timer);
    }

    addBall = () =>{
        this.setState((prevState, props)=>{
            const {height,width,ballSize} = props;
            return {
                balls : [
                    ...prevState.balls,
                    {
                        xAxis: randomIntFromInterval(0, width - ballSize),
                        yAxis: randomIntFromInterval(0, height - ballSize),
                        xDirection: randomIntFromInterval(-1,1) >= 0 ? 1 : -1,
                        yDirection: randomIntFromInterval(-1,1) >= 0 ? 1 : -1,
                        color: prevState.colors.shift()
                    }
                ]
            }
        })
    }

    changeBallPosition = (maxHorizontalPosition, maxVerticalPosition) =>{
        return ball => {
            const {xAxis,yAxis,xDirection,yDirection,color} = ball;
            
            let newHorizontalDirection = xDirection;
            let newVerticalDirection = yDirection;

            if(xAxis>=maxHorizontalPosition || xAxis <=0){
                newHorizontalDirection *= -1;
            }
            if(yAxis>=maxVerticalPosition || yAxis <=0){
                newVerticalDirection *= -1;
            }
            return {
                xAxis : xAxis + newHorizontalDirection,
                yAxis : yAxis + newVerticalDirection,
                xDirection : newHorizontalDirection,
                yDirection : newVerticalDirection,
                color: color
            }
        }
    }

    bounceAllBalls = speed =>{
        timer = setInterval(()=>{
            this.setState((prevState,props) =>{
                const {height,width,ballSize} = props;
                const maxHorizontalPosition = width - ballSize;
                const maxVerticalPosition = height - ballSize;
                const {balls} = prevState;
                const newBalls = balls.map(
                    this.changeBallPosition(maxHorizontalPosition,maxVerticalPosition)
                )
                return{
                    balls :[...newBalls],
                    speed : speed
                }
            })
        },speed)
        return timer;
    }

    toggleAnimation = () => {
        const {speed} =this.state;
        if (timer) {
            clearInterval(timer);
            timer = null;
            this.setState({intervalId:timer});
            return;
        }
        this.setState({intervalId:this.bounceAllBalls(speed)})
    }

    speedUp = () => {
        const {speed} = this.state;
        if(speed<=25){
            alert('Cannot speed up more!');
            return;
        }
        clearInterval(timer);
        this.setState({intervalId:this.bounceAllBalls(speed/2.0)})
    }

    speedDown = () => {
        const {speed} = this.state;
        if(speed * 2 >=1800){
            alert('Cannot speed down more!');
            return;
        }
        clearInterval(timer);
        this.setState({intervalId:this.bounceAllBalls(speed * 2.0)})
    }

    deleteBall = color =>{
        return event => {
            const balls =this.state.balls.filter(ball =>{
                return ball.color !==color;
            })
            this.setState(prevState=>{
                return {
                    balls: balls,
                    colors :[...prevState.colors,color]

                }
            })
        }
    }

    onKeyPressed = event =>{
        switch(event.key){
            case 'Enter':{
                if(this.state.balls.length >=10){
                    alert('You cannot have more than 10 balls on the board!');
                    return null;
                }
                this.addBall();
                return;
            } case 'ArrowUp':
                this.speedUp();
                break;
              case 'ArrowDown':
                this.speedDown();
                break;
              case ' ':
                this.toggleAnimation();
                break;
              default:
                break;
        }
    }

    render(){
        const {height, width, ballSize} = this.props;
        const boardStyle = {
            height : `${height}px`,
            width : `${width}px`,
        }

        const children = this.state.balls.map((ball)=>{
            return(
                <Ball
                key={Math.random()*ballSize}
                color={ball.color}
                xAxis={ball.xAxis}
                yAxis={ball.yAxis}
                ballSize={ballSize}
                onClick={this.deleteBall}
                />
            )
        })

        return (
            <div 
                className="board"
                style={boardStyle}
                tabIndex="0"
                onKeyDown={this.onKeyPressed}>
                {children}
            </div>
            )
    }
}

export default Board;