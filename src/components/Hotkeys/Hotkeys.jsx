import React from 'react';
import { Button, Typography } from 'antd';
import './Hotkeys.css';

const Hotkeys = () => {
  return (
    <div className='hotkeys'>
      <h3 className="hotkeys-title">Hotkeys</h3>
      <div>
        <Button className="hotkey-btn" type={'dashed'} size={'large'}>
          W / &#8593;
        </Button>
        <Typography.Text keyboard>up</Typography.Text>
      </div>
      <div>
        <Button className="hotkey-btn" type={'dashed'} size={'large'}>
          D / &#8594; 
        </Button>
        <Typography.Text keyboard>right</Typography.Text>
      </div>
      <div>
        <Button className="hotkey-btn" type={'dashed'} size={'large'}>
          S / &#8595;
        </Button>
        <Typography.Text keyboard>down</Typography.Text>
      </div>
      <div>
        <Button className="hotkey-btn" type={'dashed'} size={'large'}>
          A / &#8592;
        </Button>
        <Typography.Text keyboard>left</Typography.Text>
      </div>
    </div>
  );
};

export default Hotkeys;
