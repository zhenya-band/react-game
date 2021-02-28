import { Radio, Slider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import NoSoundIcon from '../NoSoundIcon/NoSoundIcon';
import { SoundOutlined } from '@ant-design/icons';
import './Settings.css';

const Settings = (props) => {
  return (
    <Modal
      className='settings'
      title='Settings'
      visible={props.visible}
      footer={null}
      onCancel={props.handleCancel}
      // onOk={handleOk}
      // onCancel={handleCancel}
    >
      <div className='settings-item'>
        <div className='settings-item__title'>Music</div>
        <div className='settings-music'>
          <NoSoundIcon />
          <Slider
            className='settings-music__slider'
            onChange={props.handleMusicVolumeChange}
            value={props.musicVolume}
          />
          <SoundOutlined />
        </div>
      </div>
      <div className='settings-item'>
        <div className='settings-item__title'>Sound</div>
        <div className='settings-sound'>
          <NoSoundIcon />
          <Slider
            className='settings-sound__slider'
            onChange={props.handleSoundVolumeChange}
            value={props.soundVolume}
          />
          <SoundOutlined />
        </div>
      </div>
      <div className='settings-item'>
        <div className="settings-item__title">Snake type</div>
        <Radio.Group
          className="settings-snake-type"
          options={props.snakeTypes}
          onChange={props.onSnakeTypeChange}
          value={props.snakeType}
          optionType='button'
          buttonStyle='solid'
        />
      </div>
      <div className='settings-item'>
        <div className="settings-item__title">Snake speed</div>
        <Radio.Group
          className="settings-snake-speed"
          options={props.snakeSpeeds}
          onChange={props.onSnakeSpeedChange}
          value={props.snakeSpeed}
          optionType='button'
          buttonStyle='solid'
        />
      </div>
    </Modal>
  );
};

export default Settings;
