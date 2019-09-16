import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = ({title, children}) => {
  return (
    <div className="card__title">
      <h5 className="bold-text">{title}</h5>
      {children}
    </div>
  );
};

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardTitle;