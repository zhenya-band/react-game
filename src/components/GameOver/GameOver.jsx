import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './GameOver.css';

const GameOver = (props) => {
  return (
    <div className='game-over'>
      <div className='game-over__text'>Game over</div>
      <div className='game-over__score'>Score: {props.score}</div>
      <Link to="/">
        <Button
          onClick={props.startNewGame}
          type='primary'
          className='game-over__btn'
        >
          New game
        </Button>
      </Link>
    </div>
  );
};

export default GameOver;
