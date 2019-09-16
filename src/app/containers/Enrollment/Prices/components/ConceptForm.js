import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import TextField from '../../../../shared/components/form/TextField';
import SelectField from '../../../../shared/components/form/Select';
import DecimalField from '../../../../shared/components/form/DecimalField';
import PageLoading from '../../../../shared/components/PageLoading';

// redux

// utils
import { normalizeDecimal } from '../../../../utils/utils';
import { loadClassrooms } from '../../../../redux/actions/complement';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'price',
    'classroomId'
  ];

  requiredFields.forEach(field => {
    if( !values[field]) {
      errors[field] = 'Requerido';
    }
  });
  return errors;
}

class ConceptForm extends Component {
  
  componentDidMount() {
    this.props.loadClassrooms();
    this.props.changeValue( 'concept_enrollment_form', 'name', "MATRÍCULA");
  }
  
  changeName = value => {
    var name = this.props.classrooms.find(c => c.value == value[0]).label;
    this.props.changeValue( 'concept_enrollment_form', 'name', "MATRÍCULA " + name);
    // console.log("name", name);
  }
  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
      submitting,
      reset,
      classrooms} = this.props;
      // console.log(classrooms);
    return (
      <form onSubmit={handleSubmit} className="form">
        <Row>
          <Col md={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">Nombre</span>
              <div className="form__form-group-field">
                <Field
                  name="name"
                  component={TextField}
                  type="text"
                  disabled={true}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <div className="form__form-group"> 
              <span className="form__form-group-label">Aula</span>
              <div className="form__form-group-field">
                <Field
                  name="classroomId"
                  component={SelectField}
                  options={classrooms}
                  onChange={this.changeName}
                />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="form__form-group"> 
              <span className="form__form-group-label">Precio</span>
              <div className="form__form-group-field">
                <Field
                  name="price"
                  component={DecimalField}
                  normalize={normalizeDecimal}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button disabled={ invalid || pristine || submitting } color="primary" size="sm" type="submit" >Guardar</Button>
            <Button disabled={ pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
          </Col>
        </Row>
        { submitting && <PageLoading />}
      </form>
    );
  }
}

ConceptForm.propTypes = {
  classrooms: PropTypes.array.isRequired
};

ConceptForm.defaultProps = {
  classrooms: []
}
// const selector = formValueSelector('concept_enrollment_form');
const mapStateToProps = state => ({
  classrooms: state.complement.classrooms
})

export default connect(mapStateToProps, {
  changeValue: change,
  loadClassrooms
})(reduxForm({
  form: 'concept_enrollment_form',
  validate
})(ConceptForm));