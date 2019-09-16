import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Col, Row, Card, CardBody, Button } from 'reactstrap';

// components
import PageLoading from '../../../../shared/components/PageLoading';
import TextField from '../../../../shared/components/form/TextField';
import RegionField from '../../../../shared/components/form/RegionField';
import SelectField from '../../../../shared/components/form/Select';
import DatePickerField from '../../../../shared/components/form/DatePicker';
import Modal from '../../../../shared/components/Modal';

// redux
import { getDepartments, getProvinces, getDistricts } from '../../../../redux/selectors/ubigeo';
import { fetchDataWithIdentityDocument } from '../../../../redux/actions/service';
import { setCodDep, setCodPro } from '../../../../redux/actions/ubigeo';

// utils
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';
import { normalizePhone, normalizeDocument, Length } from '../../../../utils/utils';

// constants
import { SUBJECT_TYPE_FATHER, NO_ENCONTRADO, ENCONTRADO, EXISTE, SUBJECT_TYPE_PARENT, MAX_LENGTH_DNI } from '../../../../Constants';

const sex = [
    {value: "1", label:"Masculino"},
    {value: "2", label:"Femenino"}
];

const validate = values => {
    const errors = {};
    const requiredFields = [
        'firstname',
        'lastName',
        'identityNumber',
        'adrress',
        'phone',
        'ubigeo'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class RepresentativeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          load: false,
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
        this.props.registerInput('representative_form', 'subject','Field');
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
                if(value.length==MAX_LENGTH_DNI) {
                    this.setState({load: true});
                    fetchDataWithIdentityDocument(value, SUBJECT_TYPE_PARENT).then(response =>{
                        const { data, code } = response;
                        if(code == NO_ENCONTRADO) {
                            this.props.changeValue( 'representative_form', 'dni', data.dni);
                            this.props.changeValue( 'representative_form', 'firstName', data.firstName);
                            this.props.changeValue( 'representative_form', 'lastName', data.lastName);
                            this.setState({load: false});
                        }
                        if(code == ENCONTRADO) {
                            this.props.changeValue( 'representative_form', 'dni', data.dni);
                            this.props.changeValue( 'representative_form', 'firstName', data.firstName);
                            this.props.changeValue( 'representative_form', 'lastName', data.lastName);
                            this.props.changeValue( 'representative_form', 'birthday', data.birthday);
                            this.props.changeValue( 'representative_form', 'phone', data.phone);
                            this.props.changeValue( 'representative_form', 'codDep', data.codDep);
                            this.props.changeValue( 'representative_form', 'codPro', data.codPro);
                            this.props.changeValue( 'representative_form', 'codDis', data.codDis);
                            this.props.changeValue( 'representative_form', 'city', data.city);
                            this.props.changeValue( 'representative_form', 'sex', data.sex);
                            this.props.changeValue( 'representative_form', 'address', data.address);
                            this.props.changeValue( 'representative_form', 'subject', data.identifier);
                            this.setState({load: false});               
                        }
                        if(response.code == EXISTE){
                            this.setState({load: false});
                            this.setState({ showModal: true });
                            this.props.changeValue( 'representative_form', 'identityNumber','');
                        }
                    });
                }
            })
        }
    }
    
    render() {
        const { handleSubmit, departments, provinces, districts,
            invalid, pristine, submitting, reset } = this.props;
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
                    message={`Ya existe registrado apoderado con este DNI, ingrese otro DNI`}
                    onClose={() => this.setState({showModal: false})}
                    onConfirm={() => {
                        this.setState({showModal: false})
                    }}
                />
            </form>
        );
    }
}

RepresentativeForm.propTypes = {
    departments: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    dni: PropTypes.string,
    setCodDep: PropTypes.func.isRequired,
    setCodPro: PropTypes.func.isRequired,
}

RepresentativeForm.defaultProps = {
    departments: [],
    provinces: [],
    districts: []
}

const ParentFormEdit = reduxForm(
    {
      form: 'representative_form',
      validate,
    }
)(RepresentativeForm);

const selector = formValueSelector('representative_form');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    dni: selector(state, 'identityNumber')
});
export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
    changeValue: change,
    registerInput: registerField,
})(setPropsAsInitial(ParentFormEdit));
