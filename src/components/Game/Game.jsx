import React from 'react';
import Food from '../Food/Food';
import Snake from '../Snake/Snake';
import './Game.css';

const Game = (props) => {
  return (
    <div className='game'>
      <div className='score'>Score : {props.score}</div>
      <main className='main'>
        <div className='game-board' style={{backgroundColor: props.currentBgcolor}}>
          <Snake
            color={props.snakeColor}
            snakeParts={props.snakeParts}
            snakeType={props.currentSnakeType}
          />
          <Food foodPosition={props.foodPosition} />
        </div>
      </main>
    </div>
  );
};

export default Game;
