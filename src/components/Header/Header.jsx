import React from 'react';
import './Header.css';
import { Layout, Button } from 'antd';
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons/lib';

const Header = (props) => {
  return (
    <Layout.Header className='header'>
      <div className='headet-inner'>
        <h1 className='logo'>Snake game</h1>
        <div className=''>
          <Button
            type='primary'
            onClick={props.openSettings}
            className='settings-btn'
          >
            Settings
          </Button>
          <Button
            type='primary'
            className='scores-btn'
            onClick={props.openScores}
          >
            Best scores
          </Button>
          {props.isFullScreen ? (
            <Button size={'middle'} onClick={props.offFullScreen}>
              <FullscreenExitOutlined />
            </Button>
          ) : (
            <Button size={'middle'} onClick={props.onFullScreen}>
              <FullscreenOutlined />
            </Button>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
