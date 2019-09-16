import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { Field, reduxForm, registerField, change, formValueSelector } from 'redux-form';

// components
import DatePickerField from '../../../shared/components/form/DatePicker';
import PageLoading from '../../../shared/components/PageLoading';
import RegionField from '../../../shared/components/form/RegionField';
import TextField from '../../../shared/components/form/TextField';
import Modal from '../../../shared/components/Modal';

// redux
import { setCodDep, setCodPro } from '../../../redux/actions/ubigeo';
import { fetchDataWithIdentityDocument } from '../../../redux/actions/service';
import { getDepartments, getProvinces, getDistricts } from '../../../redux/selectors/ubigeo';

// constants
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, MAX_LENGTH_DNI } from '../../../Constants';

// utils
import { setPropsAsInitial } from '../../../helpers/setPropsAsInitial';
import { Length,  normalizePhone, normalizeDocument } from '../../../utils/utils';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'firstName',
      'lastName',
      'identityNumber',
      'adrress',
      'phone',
      'ubigeo',
      'city'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class ParentForm extends Component {
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
        this.props.registerInput('parent_form', 'subject','Field');
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
                if(value.length== MAX_LENGTH_DNI){
                    this.setState({load: true});
                    fetchDataWithIdentityDocument(value, this.props.subjectType).then(response =>{
                        const { data, code } = response;
                        if(code == NO_ENCONTRADO){
                            console.log(data);
                            if(data) {
                                this.props.changeValue( 'parent_form', 'dni', data.dni);
                                this.props.changeValue( 'parent_form', 'firstName', data.firstName);
                                this.props.changeValue( 'parent_form', 'lastName', data.lastName);
                            }
                            this.setState({load: false});
                        }
                        if(code == ENCONTRADO){
                            this.props.changeValue( 'parent_form', 'dni', data.dni);
                            this.props.changeValue( 'parent_form', 'firstName', data.firstName);
                            this.props.changeValue( 'parent_form', 'lastName', data.lastName);
                            this.props.changeValue( 'paren_form', 'birthday', data.birthday);
                            this.props.changeValue( 'parent_form', 'phone', data.phone);
                            this.props.changeValue( 'parent_form', 'codDep', data.codDep);
                            this.props.changeValue( 'parent_form', 'codPro', data.codPro);
                            this.props.changeValue( 'parent_form', 'codDis', data.codDis);
                            this.props.changeValue( 'parent_form', 'city', data.city);
                            this.props.changeValue( 'parent_form', 'address', data.address);
                            this.props.changeValue( 'parent_Form', 'subject', data.identifier);
                            this.setState({load: false});              
                        }
                        if(code == EXISTE){
                            this.setState({load: false});
                            this.setState({ showModal: true });
                            this.props.changeValue( 'parent_form', 'identityNumber','');
                        }
                    });
                }
            })
        }
    }
    
    render() {
        const { handleSubmit, departments, provinces, districts,
            invalid, pristine, submitting, reset, textAlert } = this.props;
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
                    <Col md={6}>
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
                    <Col md={6}>
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
                        <Button disabled={invalid || pristine || submitting } color="primary" type="submit" size="sm">Guardar</Button>
                        <Button disabled={pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { (load || submitting) && <PageLoading />}
                <Modal 
                    show={this.state.showModal}
                    color="warning"
                    title="Advertencia"
                    message={`Ya existe registrado ${textAlert} con este DNI, ingrese otro DNI`}
                    onClose={() => this.setState({showModal: false})}
                    onConfirm={() => {
                        this.setState({showModal: false})
                    }}
                />
            </form>
        );
    }
}

ParentForm.propTypes = {
    departments: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    dni: PropTypes.string,
    setCodDep: PropTypes.func.isRequired,
    setCodPro: PropTypes.func.isRequired,
}

ParentForm.defaultProps = {
    departments: [],
    provinces: [],
    districts: []
}
const ParentFormEdit = reduxForm(
    {
      form: 'parent_form',
      validate,
    }
)(ParentForm);

const selector = formValueSelector('parent_form');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    dni: selector(state, 'identityNumber')

});

export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
    registerInput: registerField,
    changeValue: change,
})(setPropsAsInitial(ParentFormEdit));
