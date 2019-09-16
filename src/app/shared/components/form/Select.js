import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      selectedOption: '',
    }
  }
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      label: PropTypes.string,
    })),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
    isDisabled: PropTypes.bool,
    isClearable: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    options: [],
  };

  componentDidMount() {
    
    if(this.props.value) {
      const { options, value} = this.props;
      this.setState({
        selectedOption: this.findOption(options, value)
      });
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      const { options, value} = this.props;
      this.setState({
        selectedOption: this.findOption(options, value)
      });
    }
  }
  findOption = (options, value) => {
    if(typeof value === 'number'){
      value = value.toString()
    }
    let option = options.find(option => option.value === value);
    return option ? option: '';
  }
  handleChange = (selected) => {
    const value = selected ? selected.value : null;
    this.setState({
      selectedOption: selected,
    }, () => this.props.onChange(value))
  };

  render() {
    const {
      value, name, placeholder, options, isDisabled, isClearable
    } = this.props;
    const { selectedOption } = this.state;
    return (
      <Select
        name={name}
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        isDisabled={isDisabled}
        isClearable={isClearable}
        className="react-select"
        placeholder={placeholder}
        classNamePrefix="react-select"
        noOptionsMessage={() => "No hay resultados" }

      />
    );
  }
}

const renderSelectField = props => (
  <div className="form__form-group-input-wrap">
    <SelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
      isDisabled={props.isDisabled}
      isClearable
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.meta.error}</span>}
  </div>
);

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
  isDisabled: false,
  isClearable: true
};

export default renderSelectField;
