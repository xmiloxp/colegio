import React from 'react';
import classNames from 'classnames';
//import '.Box.scss';

const Box = ({title, color, children}) => {
  const boxClasses = classNames({
    'box': true,
    [color]: color
  })
  return (
    <div className={boxClasses}>
      <div className="box-header with-border">
          <div className="box-title">{title}</div>
      </div>
      <div className="box-body">
          {children}
      </div>
    </div>
  );
};

export default Box;