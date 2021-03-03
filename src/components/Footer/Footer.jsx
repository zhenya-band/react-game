import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import rssLogo from './../../assets/rss-logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-inner'>
        <a href='https://github.com/zhenya-band'>
          <GithubOutlined style={{ fontSize: '37px' }} />
        </a>
        <div className='footer-year'>2021</div>
        <a href='https://rs.school/js/' className='footer-logo'>
          <img className='footer-logo__img' src={rssLogo} alt='logo'/>
        </a>
      </div>
    </div>
  );
};

export default Footer;
