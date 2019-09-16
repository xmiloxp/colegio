import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import { Col, Row, Card, CardBody,Button } from 'reactstrap';
import CalendarCheckIcon from 'mdi-react/CalendarCheckIcon';
import AccountTieIcon from 'mdi-react/AccountTieIcon';
import CounterIcon from 'mdi-react/CounterIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

import TextField from '../../../../shared/components/form/TextField';
import DatePickerField from '../../../../shared/components/form/DatePicker';
import SelectField from '../../../../shared/components/form/Select';
import PageLoading from '../../../../shared/components/PageLoading';
import { fetchAcademicYear } from '../../../../redux/actions/academicYear';
import { getAcademicyear } from '../../../../redux/selectors/academicyear';
import { loadStudents } from '../../../../redux/actions/complement';


const validate = values => {
    const errors = {};

    return errors;
}

class EnrollmentForm extends Component {
    constructor (props) {
        super (props);
        this.state = {
            classrooms:[],
            vacant: ''
        } 
    }
    componentDidMount() {
        this.props.fetchAcademicYear();
        this.props.loadStudents();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.academicYear != this.props.academicYear){
            var classrooms = this.props.academicYear.classrooms.map( item => ({value: `${item.id}` , label: item.name}) );
            this.props.changeValue( 'enrollment_form', 'period', this.props.academicYear.name);
            this.setState({
                classrooms : classrooms
            })
        }
        if(prevProps.classroom != this.props.classroom) {
            var data = this.props.academicYear.classrooms.find(c => `${c.id}` === this.props.classroom);
            this.props.changeValue( 'enrollment_form', 'vacant', data ? data.vacant : '');
        }
    }
    

    render() {

        const { handleSubmit, invalid, pristine, submitting, reset, students } = this.props;
        const { classrooms } = this.state;
        console.log(students);
        return (
            <form className="form" onSubmit={handleSubmit}>
                <Row>
                    <Col md={3}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Periodo Académico</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    <CalendarCheckIcon />
                                </div>
                                <Field 
                                    name="period"
                                    component={TextField}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Fecha:</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="date"
                                    component={DatePickerField}
                                    disabled={true}
                                    today={true}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Alumno</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="studentId"
                                    component={SelectField} 
                                    options={students}
                                />    
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Apoderado</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    <AccountTieIcon />
                                </div>
                                <Field 
                                    name="parent"
                                    component={TextField}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </Col> */}
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Aula</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="classroomId"
                                    component={SelectField} 
                                    options={classrooms}
                                />    
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Vacantes libres</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    <CounterIcon />
                                </div>
                                <Field 
                                    name="vacant"
                                    component={TextField}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Observación</span>
                            <div className="form__form-group-field">
                                <div className="form__form-group-icon">
                                    <SquareEditOutlineIcon />
                                </div>
                                <Field 
                                    name="observation"
                                    component={TextField}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button disabled={ invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
                        <Button disabled={submitting || pristine}  size="sm" onClick={reset} >Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}
EnrollmentForm.propTypes = {
    students: PropTypes.array.isRequired,
}

EnrollmentForm.defaultProps = {
    students: [],
}
const selector = formValueSelector('enrollment_form');
const mapStateToProps = state => ({
    classroom: selector(state, 'classroomId'),
    academicYear: getAcademicyear(state),
    students: state.complement.students
});
const EnrollmentFormEdit = reduxForm(
    {
      form: 'enrollment_form',
      validate
    }
  )(EnrollmentForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
    fetchAcademicYear,
    loadStudents
})(EnrollmentFormEdit);
