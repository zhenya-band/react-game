import React from 'react';
import './Food.css';

const Food = ({ foodPosition }) => {
  return (
    <div
      className='food'
      style={{ left: foodPosition[0], top: foodPosition[1] }}
    ></div>
  );
};

export default Food;
