import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { Prompt } from 'react-router-dom';

// component
import TextField from './TextField';
import PageLoading from '../PageLoading';

// utils
import { setPropsAsInitial } from '../../../helpers/setPropsAsInitial';
import { toUpper } from '../../../utils/utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  });
  return errors;
}

const BasicForm = (props) => {
  const { handleSubmit, pristine, submitting, invalid, reset } = props;
  return (
    <form onSubmit={handleSubmit} className="form">
      <Row>
        <Col md={4}>
          <div className="form__form-group">
            <span>Descripción</span>
            <div className="form__form-group-field">
              <Field 
                name="name"
                type="text"
                component={TextField}
                parse={toUpper}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button color="primary" size="sm" type="submit" disabled={ invalid || pristine || submitting }>Guardar</Button>
          <Button disabled={ pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
        </Col>
      </Row>
      { submitting && <PageLoading />}
      {/* <Prompt
        when={!pristine}
        message="Se perderán los datos si continúa"></Prompt> */}
    </form>
  );
}

const BasicFormEdit = reduxForm(
    {
      form: 'basic_form',
      validate
    }
  )(BasicForm);
export default setPropsAsInitial(BasicFormEdit);
