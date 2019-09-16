import React from "react";
import PropTypes from 'prop-types';



const DecimalField = ({ ...props }) => {
  const handleBlur = value => {
    props.input.onChange(parseFloat(props.input.value).toFixed(2))
  }
  const {
    input,
    placeholder,
    type,
    meta: { error, touched},
  } = props;
  const errorInput= (error && touched);
  return (
    <div className="form__form-group-input-wrap">
      <input {...input} placeholder={placeholder} type={type} onBlur={handleBlur}/>
      {errorInput && <span className="form__form-group-error">{error}</span>}
    </div>
  );
}

DecimalField.propTypes = {
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
}

DecimalField.defaultProps = {
  type: 'text',
  placeholder: '',
}
export default DecimalField;
