import React from 'react';
import './App.css';
import Board from '../Board';

const App = () => {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Bouncing Balls!</h1>
        </div>
        <p className="App-intro">
        <p>
          <strong>
            Click the board before applying these following commands:
          </strong>
        </p>
         <ol>
           <li>
             <strong>Enter</strong> to add more ball inside the box
           </li>
           <li>
             <strong>Spacebar</strong> to play/pause all balls inside the box
           </li>
            <li>↑ to increase the speed</li>
            <li>↓ to decrease the speed</li>
            <li>Click on the ball to erase it</li>
         </ol>
        </p>
        <div className="board-wrapper">
          <Board height={450} width={450} ballSize={30}/>
        </div>
      </div>
    );
  }

export default App;
