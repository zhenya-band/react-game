import React from 'react';
import './Snake.css'

export const Snake = (props) => {
  const borderRadius = props.snakeType === 'Square' ? '0' : '10px';
  const snakeParts = props.snakeParts.map((part, i) => {
    return (
      <div
        className='snake'
        key={i}
        style={{ left: part[0], top: part[1], backgroundColor: props.color, borderRadius: borderRadius  }}
      ></div>
    );
  });

  return <div>{snakeParts}</div>;
};

export default Snake;
