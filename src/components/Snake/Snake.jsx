import React from 'react';

export const Snake = (props) => {
  const snakeParts = props.snakeParts.map((part, i) => {
    return (
      <div
        className='snake'
        key={i}
        style={{ left: part[0], top: part[1] }}
      ></div>
    );
  });

  return <div>{snakeParts}</div>;
};

export default Snake;
