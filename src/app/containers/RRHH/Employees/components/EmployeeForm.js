import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

//component
import TextField from '../../../../shared/components/form/TextField';
import RegionField from '../../../../shared/components/form/RegionField';
import PageLoading from '../../../../shared/components/PageLoading';
import SelectField from '../../../../shared/components/form/Select';
import DatePickerField from '../../../../shared/components/form/DatePicker';
import Modal from '../../../../shared/components/Modal';
import DecimalField from '../../../../shared/components/form/DecimalField';

//redux
import { setCodDep, setCodPro } from '../../../../redux/actions/ubigeo';
import { getDepartments, getProvinces, getDistricts } from '../../../../redux/selectors/ubigeo';
import { loadSeats, loadVoucherTypes, loadPayModes } from '../../../../redux/actions/complement';
import { fetchDataWithIdentityDocument } from '../../../../redux/actions/service';

//utils
import { normalizePhone, Length, normalizeDecimal, normalizeDocument } from '../../../../utils/utils';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

//constants
import { SUBJECT_TYPE_EMPLOYEE, SUBJECT_TYPE_TEACHER, MAX_LENGTH_DNI, NO_ENCONTRADO, ENCONTRADO, EXISTE } from '../../../../Constants';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'firstName',
        'lastName',
        'subjectType',
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
const subjectTypes = [
    { value: `${SUBJECT_TYPE_TEACHER}` , label: 'Docente' },
    { value: `${SUBJECT_TYPE_EMPLOYEE}` , label: 'Administrativo' }
];
const sex = [
    { value: "1" , label: 'Masculino' },
    { value: "2" , label: 'Femenino' }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            load: false,
            identityNumber: props.identityNumber,
            role: props.role
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
        this.props.registerInput('employee_form', 'subject', 'Field');
        this.props.loadSeats();
        this.props.loadPayModes();
        this.props.loadVoucherTypes();
    }

    componentDidUpdate(prevProps) {
        if((this.count ===1) && this.props.data) {
            this.setState({
                identityNumber: this.props.data.identityNumber,
                role: this.props.data.subjectType
            });
            this.count++;
        }
    }
    

    handleBlur = (identityNumber, subjectType) => {
        if(identityNumber != this.state.identityNumber || subjectType != this.state.role) {
            this.setState({
                identityNumber: identityNumber,
                role: subjectType
            })
            if( !!identityNumber && !!subjectType) {
                return sleep(100).then(() => {
                    if(identityNumber.length == MAX_LENGTH_DNI) {
                        this.setState({load: true});
                        fetchDataWithIdentityDocument(identityNumber, subjectType).then(response =>{
                            const { data, code } = response;
                            if(code == NO_ENCONTRADO) {
                                this.props.changeValue( 'employee_form', 'dni', data.dni);
                                this.props.changeValue( 'employee_form', 'firstName', data.firstName);
                                this.props.changeValue( 'employee_form', 'lastName', data.lastName);
                                this.setState({load: false});
                            }
                            if(code == ENCONTRADO) {
                                this.props.changeValue( 'employee_form', 'dni', data.dni);
                                this.props.changeValue( 'employee_form', 'firstName', data.firstName);
                                this.props.changeValue( 'employee_form', 'lastName', data.lastName);
                                this.props.changeValue( 'employee_form', 'birthday', data.birthday);
                                this.props.changeValue( 'employee_form', 'phone', data.phone);
                                this.props.changeValue( 'employee_form', 'ubigeo', data.ubigeo);
                                this.props.changeValue( 'employee_form', 'city', data.city);
                                this.props.changeValue( 'employee_form', 'sex', data.sex);
                                this.props.changeValue( 'employee_form', 'address', data.address);
                                this.props.changeValue( 'employee_form', 'subject', data.identifier);
                                this.setState({load: false});               
                            }
                            if(response.code == EXISTE){
                                this.setState({load: false});
                                this.setState({ showModal: true });
                                this.props.changeValue( 'employee_form', 'identityNumber','');
                            }
                        });
                    }
                })
            }
        }
    }

    render() {
        const { handleSubmit, seats, departments, provinces,
            identityNumber, subjectType, 
            districts, reset, pristine, payModes, voucherTypes,
            submitting, initDate, endDate, invalid } = this.props;
        const { load } = this.state;
        console.log(subjectType);
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Rol</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="subjectType"
                                    component={SelectField}
                                    options={subjectTypes}
                                    onChange={(e)=>this.handleBlur(identityNumber, e[0])}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">DNI</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="identityNumber"
                                    onBlur={()=>this.handleBlur(identityNumber, subjectType)}
                                    component={TextField}
                                    // validate={[ Length(8)]}
                                    normalize={normalizeDocument(8)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Sede</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="seat"
                                    component={SelectField}
                                    options={seats}
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
                            <div className="form__form-group_field">
                                <Field 
                                    name="lastName"
                                    component={TextField} 
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
                                    component={DatePickerField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Teléfono / Celular</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="phone"
                                    component={TextField}
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
                                />
                            </div>
                        </div>                        
                    </Col>
                    <Col md={8}>
                        <div className="form__form-group-field">
                            <span className="form__form-group-label">Dirección</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="address"
                                    component={TextField}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="card__title">
                    <h5 className="bold__text">Contrato</h5>
                </div>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Fecha inicial</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="initDate"
                                    component={DatePickerField}
                                    minDate={endDate}
                                />
                            </div>
                        </div>

                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Fecha final</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="endDate"
                                    component={DatePickerField}
                                    minDate={initDate}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Modalidad de pago</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="payMode"
                                    component={SelectField}
                                    options={payModes}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form_form-group-label">Documento de pago</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="payVoucher"
                                    component={SelectField}
                                    options={voucherTypes}
                                />    
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Numero de contrato</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="contractNumber"
                                    component={TextField}
                                />    
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Sueldo</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="salary"
                                    normalize={normalizeDecimal}
                                    component={DecimalField}
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
                { (load || submitting) && <PageLoading/>}
                <Modal 
                    show={this.state.showModal}
                    color="warning"
                    title="Advertencia"
                    message={`Ya existe registrado un empleado con este DNI, ingrese otro DNI`}
                    onClose={() => this.setState({showModal: false})}
                    onConfirm={() => {
                        this.setState({showModal: false})
                    }}
                />
            </form>
        );
    }
}

EmployeeForm.propTypes = {
    departments: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    identityNumber: PropTypes.string,
    setCodDep: PropTypes.func.isRequired,
    setCodPro: PropTypes.func.isRequired,
    loadSeats: PropTypes.func.isRequired,
    loadVoucherTypes: PropTypes.func.isRequired,
    loadPayModes: PropTypes.func.isRequired,
    seats: PropTypes.array,
    voucherTypes: PropTypes.array,
    payModes: PropTypes.array,
}

EmployeeForm.defaultProps = {
    departments: [],
    provinces: [],
    districts: [],
    seats: [],
    voucherTypes: [],
    payModes: []
}
const EmployeeFormEdit = reduxForm(
    {
      form: 'employee_form',
      validate
    }
  )(EmployeeForm);

const selector = formValueSelector('employee_form');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    seats: state.complement.seats,
    voucherTypes: state.complement.vouchertypes,
    payModes: state.complement.paymodes,
    initDate: selector(state, 'initDate'),
    endDate: selector(state, 'endDate'),
    identityNumber: selector(state, 'identityNumber'),
    subjectType: selector(state, 'subjectType'),
});
export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
    loadSeats,
    loadVoucherTypes,
    loadPayModes,
    changeValue: change,
    registerInput: registerField,
})(setPropsAsInitial(EmployeeFormEdit));
