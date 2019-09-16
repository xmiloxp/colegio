import React from 'react';
import { Button } from 'antd';
// import './index.scss';

const NotFoundPage = () => {
  return (
    <div className="normal">
      <div className="container">
        <h1 className="title">404</h1>
        <p className="desc">La página no fue encontrada</p>
        <a href="/"><Button type="primary" style={{ marginTop: 5 }}>Regresar</Button></a>
      </div>
    </div>
  );
};

export default NotFoundPage;