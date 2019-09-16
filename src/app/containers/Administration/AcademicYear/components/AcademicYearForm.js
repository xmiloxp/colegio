import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import PageLoading from '../../../../shared/components/PageLoading';
import MultiCheckBoxField from '../../../../shared/components/form/MultiCheckBox';
import TextField from '../../../../shared/components/form/TextField';
import DatePickerField from '../../../../shared/components/form/DatePicker';

// redux
import { loadClassrooms } from '../../../../redux/actions/complement';

// utils
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'name',
      'initdate',
      'enddate'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class AcademicYearForm extends Component {

    componentDidMount() {
        this.props.loadClassrooms();
    }
    
    render() {
        const { handleSubmit, pristine, submitting, invalid, reset, classrooms, initdate, enddate } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Año escolar</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="name"
                                    component={TextField}
                                    type="text"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Fecha inicio</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="initdate"
                                    component={DatePickerField}
                                    maxDate={enddate}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Fecha final</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="enddate"
                                    component={DatePickerField}
                                    minDate={initdate}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Aulas</span>
                            <div>
                                <Field
                                    name="classrooms"
                                    component={MultiCheckBoxField}
                                    color="primary"
                                    options={classrooms}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button disabled={invalid || pristine || submitting} color="primary" size="sm" type="submit">Guardar</Button>
                        <Button disabled={pristine || submitting} size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}

AcademicYearForm.propTypes = {
    loadClassrooms: PropTypes.func.isRequired,
    classrooms: PropTypes.array.isRequired,
}

AcademicYearForm.defaultProps = {
    classrooms: []
}

const AcademicYearFormEdit = reduxForm(
    {
      form: 'academicyear_form',
      validate
    }
)(AcademicYearForm);

const selector = formValueSelector('academicyear_form');

const mapStateToProps = state => ({
    classrooms: state.complement.classrooms,
    initdate: selector(state,'initdate'),
    enddate: selector(state,'enddate')
})

export default connect(mapStateToProps, {
    loadClassrooms
})(setPropsAsInitial(AcademicYearFormEdit));
