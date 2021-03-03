import Modal from 'antd/lib/modal/Modal';
import { Table } from 'antd';
import React from 'react';
import './BestScores.css';

const columns = [
  {
    title: '№',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
];

export const BestScores = (props) => {
  let data;
  if (props.data) {
    data = props.data
      .sort((a, b) => b.score - a.score)
      .map((item, i) => {
        item.number = i + 1;
        return item;
      });
    if (data.length > 10) {
      data.splice(10);
    }
  }
  return (
    <Modal
      className='settings'
      title='Best scores'
      visible={props.visible}
      footer={null}
      onCancel={props.handleScoresClose}
    >
      <Table columns={columns} dataSource={data} pagination={false} />
    </Modal>
  );
};
