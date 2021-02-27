import React from 'react';
import './Header.css';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
const Header = () => {
  return (
    <Layout.Header className='header'>
      <div className='headet-inner'>
        <div className='logo'>Snake game</div>
        <Button type='primary'>Settings</Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
