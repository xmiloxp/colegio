import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { Field, reduxForm, change } from 'redux-form';
import Cash100Icon from 'mdi-react/Cash100Icon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

// components
import DecimalField from '../../../shared/components/form/DecimalField';
import TextField from '../../../shared/components/form/TextField';
import PageLoading from '../../../shared/components/PageLoading';

// constants

// redux

// utils
import { normalizeDecimal } from '../../../utils/utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'init_amount'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  });
  return errors;
}

class OpenCashboxForm extends Component {

  componentDidMount() {
    this.props.changeValue('opencash_form', 'init_amount', "0.00");
  }
  
  render() {
    const { handleSubmit, pristine, submitting, reset, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form">
        <Row>
          <Col md={4}>
            <div className="form__form-group">
              <span className="form__form-group-label">Monto inicial</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <Cash100Icon />                  
                </div>
                <Field 
                  name="init_amount"
                  component={DecimalField}
                  normalize={normalizeDecimal}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="form__form-group">
              <span className="form__form-group-label">Descripción</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <SquareEditOutlineIcon />
                </div>
                <Field 
                  name="description"
                  component={TextField}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button disabled={invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
            <Button disabled={pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
          </Col>
        </Row>
        { submitting && <PageLoading />}
      </form>
    );
  }

}

OpenCashboxForm.propTypes = {


};
export default connect(null,{
  changeValue: change
})(reduxForm({
  form: 'opencash_form',
  validate
})(OpenCashboxForm));