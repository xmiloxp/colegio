import React from "react";
import PropTypes from 'prop-types';

const TextField = ({ ...props }) => {
  const {
    input,
    placeholder,
    type,
    disabled,
    meta: { error, touched},
  } = props;
  const errorInput= (error && touched);
  return (
    <div className="form__form-group-input-wrap">
      <input {...input} placeholder={placeholder} type={type} disabled={disabled} />
      {errorInput && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

TextField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error:PropTypes.string,
  }),
  disabled: PropTypes.bool,
}

TextField.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false
}
export default TextField;
