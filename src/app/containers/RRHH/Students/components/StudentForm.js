import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, change, registerField, formValueSelector } from 'redux-form';

//components
import DatePickerField from '../../../../shared/components/form/DatePicker';
import PageLoading from '../../../../shared/components/PageLoading';
import SelectField from '../../../../shared/components/form/Select';
import RegionField from '../../../../shared/components/form/RegionField';
import TextField from '../../../../shared/components/form/TextField';

//redux
import { loadFathers, loadMothers, loadParents } from '../../../../redux/actions/complement';
import { validateIdentityDocument } from '../../../../redux/actions/service';
import { getDepartments, getProvinces, getDistricts } from '../../../../redux/selectors/ubigeo';
import { setCodDep, setCodPro } from '../../../../redux/actions/ubigeo';
import Modal from '../../../../shared/components/Modal';

//utils
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';
import { normalizePhone, Length, normalizeDocument } from '../../../../utils/utils';

//constants
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, SUBJECT_TYPE_STUDENT, MAX_LENGTH_DNI } from '../../../../Constants';

const sex = [
    {value:"1",label:"Masculino"},
    {value:"2",label:"Femenino"}
];
const validate = values => {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
      'identityNumber',
      'adrress',
      'ubigeo',
      'phone'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          load: false,
          showModal: false,
          identityNumber: props.dni
        };
        this.count = 1;
      }
    getProvincesWithCodeDep = (value) => {
        this.props.setCodDep(value);
    }
    getDistrictWithCodeProv = (value) =>{
        this.props.setCodPro(value);
    }
    componentDidMount() {
        this.props.registerInput('student_form', 'subject','Field');
        this.props.loadFathers();
        this.props.loadMothers();
        this.props.loadParents();
    }
    componentDidUpdate(prevProps) {
        if((this.count === 1) && this.props.data && this.props.data.dni) {
            this.setState({
                identityNumber: this.props.data.dni
            })
            this.count++;
        }
    }
    handleBlur = ({target}) => {
        if(target.defaultValue !== this.state.identityNumber) {
            this.setState({
                identityNumber: target.defaultValue
            })
            return sleep(100).then(() => {
                const value = target.defaultValue;
                if(value.length== MAX_LENGTH_DNI) {
                    this.setState({load: true});
                    validateIdentityDocument(value, SUBJECT_TYPE_STUDENT).then(response =>{
                        const { data, code } = response;
                        if(code == NO_ENCONTRADO){
                            this.setState({load: false});
                        }
                        if(code == EXISTE){
                            this.setState({load: false});
                            this.setState({ showModal: true });
                            this.props.changeValue( 'student_form', 'identityNumber','');
                        }
                    });
                }
            });
        }
    }

    render() {
        const { handleSubmit, departments, provinces, districts, invalid,
            mothers, fathers, parents, pristine, submitting, reset } = this.props;
        const { load } = this.state;
        return (
            <form onSubmit={handleSubmit} className="form">
                <div className="card__title">
                    <h5 className="bold__text">Datos generales</h5>
                </div>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">DNI</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="identityNumber"
                                    onBlur={this.handleBlur}
                                    component={TextField}
                                    // validate={[ Length(8)]}
                                    normalize={normalizeDocument(8)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Nombres</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="firstName"
                                    component={TextField} 
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Apellidos</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="lastName"
                                    component={TextField}
                                    type="text"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Cumpleaños</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="birthday"
                                    label="Cumpleaños"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    component={DatePickerField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Teléfono</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="phone"
                                    component={TextField}
                                    type="text"
                                    normalize={normalizePhone}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Sexo</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="sex"
                                    component={SelectField}
                                    options={sex}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="card__title">
                  <h5 className="bold__text">Domicilio</h5>
                </div>
                <Row>
                    <Field
                        name="ubigeo"
                        component={RegionField}
                        departments={departments}
                        provinces={provinces}
                        districts={districts}
                        handleChangeDepartment={this.getProvincesWithCodeDep}
                        handleChangeProvince={this.getDistrictWithCodeProv}
                    />
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Ciudad</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="city"
                                    component={TextField}
                                    type="text"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Domicilio fiscal</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="address"
                                    component={TextField}
                                    type="text"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="card__title">
                  <h5 className="bold__text">Datos de Familiares</h5>
                </div>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Padre</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="father"
                                    component={SelectField}
                                    options={fathers}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Madre</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="mother"
                                    component={SelectField}
                                    options={mothers}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Apoderado</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="parent"
                                    component={SelectField}
                                    options={parents}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="card__title">
                  <h5 className="bold__text">Procedencia</h5>
                </div>
                <Row>
                    <Col md={8}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Colegio</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="origin"
                                    component={TextField}
                                    options={parents}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button disabled={invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
                        <Button disabled={pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { (load || submitting) && <PageLoading />}
                <Modal 
                    show={this.state.showModal}
                    color="warning"
                    title="Advertencia"
                    message={`Ya existe registrado un alumno con este DNI, ingrese otro DNI`}
                    onClose={() => this.setState({showModal: false})}
                    onConfirm={() => {
                        this.setState({showModal: false})
                    }}
                />
            </form>
        );
    }
}

StudentForm.propTypes = {
    departments: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    dni: PropTypes.string,
    setCodDep: PropTypes.func.isRequired,
    setCodPro: PropTypes.func.isRequired,
    loadFathers: PropTypes.func.isRequired,
    loadMothers: PropTypes.func.isRequired,
    loadParents: PropTypes.func.isRequired,
    fathers: PropTypes.array,
    mothers: PropTypes.array,
    parents: PropTypes.array,
}

StudentForm.defaultProps = {
    departments: [],
    provinces: [],
    districts: [],
    parents: [],
    mothers: [],
    fathers: []
}
const StudentFormEdit = reduxForm(
    {
      form: 'student_form',
      validate,
    }
)(StudentForm);

const selector = formValueSelector('student_form');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    dni: selector(state,'identityNumber'),
    fathers: state.complement.fathers,
    mothers: state.complement.mothers,
    parents: state.complement.parents,
});
export default connect(mapStateToProps,{

    loadFathers,
    loadMothers,
    loadParents,
    setCodDep,
    setCodPro,
    registerInput: registerField,
    changeValue: change,
})(setPropsAsInitial(StudentFormEdit));
