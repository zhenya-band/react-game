import React from 'react';
import './Header.css';
import { Layout, Button } from 'antd';
const Header = (props) => {
  return (
    <Layout.Header className='header'>
      <div className='headet-inner'>
        <div className='logo'>Snake game</div>
        <div className=''>
          <Button type='primary' onClick={props.openSettings} className="settings-btn">
            Settings
          </Button>
          <Button type='primary' onClick={props.openScores}>
            Best scores
          </Button>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
