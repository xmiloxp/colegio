import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';

class MultiCheckBox extends Component {
  handleChange = (event) => {
    const { value } = this.props;

    const newValue = [...value];
    if (event.target.checked) {
      newValue.push(value);
    } else {
      newValue.splice(newValue.indexOf(value), 1);
    }
    this.props.onChange(newValue);
  }
  render () {
    const { name, options, color } = this.props;
    return (
      <Fragment>
        {options.map(({value, label}, i) => {
          return (
            <div className="form__form-group" key={value}>
              <div className="form__form-group-field">
                <label className="checkbox-btn checkbox-btn--colored-click">
                  <input
                    className="checkbox-btn__checkbox"
                    type="checkbox"
                    id={`${name}[${i}]`}
                    name={`${name}[${i}]`}
                    checked={this.props.value.indexOf(value) !== -1}
                    onChange={(event) => {
                      const newValue = [...this.props.value];
                      if (event.target.checked) {
                        newValue.push(value);
                      } else {
                        newValue.splice(newValue.indexOf(value), 1);
                      }
                      return this.props.onChange(newValue);
                    }}
                  />
                  <span className={`checkbox-btn__checkbox-custom ${color ? `checkbox-btn__checkbox-${color}`:''}`}>
                    <CheckIcon />
                  </span>
                  <span className="checkbox-btn__label">
                    {label}
                  </span>
                </label>
              </div>
            </div>)
          })}
      </Fragment>
    );
  }
};

const renderMultiCheckBoxField = props => (
  <MultiCheckBox
    {...props.input}
    options={props.options}
    color={props.color}
  />
)
renderMultiCheckBoxField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  color: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    label: PropTypes.string,
  })),
}

renderMultiCheckBoxField.defaultProps = {
  color: '',
  options: []
}

export default renderMultiCheckBoxField;
