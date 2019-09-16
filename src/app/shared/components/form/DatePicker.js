import React, { PureComponent, Fragment } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'
import PropTypes from 'prop-types';
import CalendarIcon from 'mdi-react/CalendarIcon';
import moment from 'moment';
import { convertStringToDate } from '../../../utils/utils';
registerLocale('es',es);

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if(this.props.today){
      this.setState({
        startDate: new Date()
      })
    }
    if(this.props.value){
      this.setState({
        startDate: new Date(this.props.value)
      })
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      if(this.props.value){
        this.setState({
          startDate: new Date(this.props.value)
        })
      }
    }
  }

  handleChange(date) {
    console.log(date);
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  }

  render() {
    const { minDate, maxDate, disabled, value } = this.props;
    return (
      <Fragment>
        <div className="form__form-group-icon">
          <CalendarIcon />
        </div>
        <div className="date-picker">
          <DatePicker
            locale="es"
            className="form__form-group-datepicker"
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
            disabled={disabled}
          />
        </div>
      </Fragment>
    );
  }
}

const renderDatePickerField = props => (
  <DatePickerField
    {...props.input}
    minDate={props.minDate}
    maxDate={props.maxDate}
    today={props.today}
    disabled={props.disabled}
  />
);

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
};

renderDatePickerField.defaultProps = {
  today: false,
  disabled: false
}
export default renderDatePickerField;
