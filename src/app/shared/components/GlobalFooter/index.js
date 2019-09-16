import React from 'react';
import classNames from 'classnames';
// import './index.scss';

const GlobalFooter = ({ className, copyright }) => {
  const clsString = classNames('globalFooter', className);
  return (
    <footer className={clsString}>
      {copyright && <div className="copyright">{copyright}</div>}
    </footer>
  );
};

export default GlobalFooter;
