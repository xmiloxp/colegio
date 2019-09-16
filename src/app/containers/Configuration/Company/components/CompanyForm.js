import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import RegionField from '../../../../shared/components/form/RegionField';
import PageLoading from '../../../../shared/components/PageLoading';
import TextField from '../../../../shared/components/form/TextField';

// constants
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, SUBJECT_TYPE_ENTERPRISE, MAX_LENGTH_RUC } from '../../../../Constants';

// redux
import { getDepartments, getProvinces, getDistricts } from '../../../../redux/selectors/ubigeo';
import { fetchDataWithRuc } from '../../../../redux/actions/service';
import { setCodDep, setCodPro } from '../../../../redux/actions/ubigeo';

// utils
import { normalizeDocument, normalizePhone} from '../../../../utils/utils';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'ruc',
    'email',
    'phone',
    'businessName',
    'tradeName',
    'ubigeo',
    'city',
    'address'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Correo electronico no valido';
  }
  return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          load: false,
          ruc: props.ruc
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
        this.props.registerInput('company_form', 'subject','Field');
      }
      
    componentDidUpdate(prevProps) {
      if((this.count === 1) && this.props.data.ruc){
        this.setState({
          ruc: this.props.data.ruc
        })
        this.count++;
      }
    }
    
    handleBlur = ({ target }) => {
      if(target.defaultValue !== this.state.ruc) {
        this.setState({
          ruc: target.defaultValue
        })
        return sleep(100).then(() => {
            const value = target.defaultValue;
            if(value.length == MAX_LENGTH_RUC){
                this.setState({load: true});
            fetchDataWithRuc(value, SUBJECT_TYPE_ENTERPRISE).then(response =>{
              const { data, code } = response;

                if(code === NO_ENCONTRADO){
                    console.log(code);
                  if(data){
                    this.props.changeValue( 'company_form', 'ruc', data.ruc);
                    this.props.changeValue( 'company_form', 'businessName', data.businessName);
                    this.props.changeValue( 'company_form', 'tradeName', data.tradeName);
                    this.props.changeValue( 'company_form', 'address', data.address);
                  }
                  this.setState({load: false});
                }
                if(code === ENCONTRADO){                
                  this.setState({load: false});              
                }
                if(code === EXISTE){
                    this.setState({load: false});
                    this.setState({ show: true });
                    this.props.changeValue( 'company_form', 'ruc','');
                }
            });
            }
        })
      }
    }
    
    render() {
        const { handleSubmit, departments, provinces, districts,
           invalid, pristine, reset, submitting } = this.props;
        const { load } = this.state;
        return (
        <form onSubmit={handleSubmit} className="form">
              <Row>
                <Col md={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">RUC</span>
                  <div className="form__form-group-field">
                    <Field
                        name="ruc"
                        component={TextField}
                        type="text"
                        normalize={normalizeDocument(11)}
                        onBlur={this.handleBlur}
                    />
                  </div>
                </div>
                </Col>
              </Row>
                <Row>  
                  <Col md={6}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Razon Social</span>
                      <div className="form__form-group-field">
                        <Field
                            name="businessName"
                            component={TextField}
                            type="text"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Nombre Comercial</span>
                      <div className="form__form-group-field">
                        <Field
                            name="tradeName"
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
                      <span className="form__form-group-label">Correo electronico</span>
                      <div className="form__form-group-field">
                        <Field
                            name="email"
                            component={TextField}
                            type="text"
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
                        <Button disabled={submitting || pristine} size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { (load || submitting) && <PageLoading />}
                {/* <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderán los datos si continúa"></Prompt> */}
                {/* <SweetAlert 
                    show={this.state.show}
                    title="Información"
                    html
                    text={"Ingrese un RUC diferente"}
                    onConfirm={()=> this.setState({show: false})}
                /> */}

            </form>
        );
    }
}

CompanyForm.propTypes = {
  departments: PropTypes.array.isRequired,
  provinces: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
  ruc: PropTypes.string,
  setCodDep: PropTypes.func.isRequired,
  setCodPro: PropTypes.func.isRequired,
}

const CompanyFormEdit = reduxForm(
  {
    form: 'company_form',
    validate,
  }
)(CompanyForm);

const selector = formValueSelector('company_form');

const mapStateToProps = state => ( {
  departments: getDepartments(state),
  provinces: getProvinces(state),
  districts: getDistricts(state),
  ruc: selector(state, 'ruc')
});

export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
    changeValue: change,
    registerInput: registerField,
})(setPropsAsInitial(CompanyFormEdit));

