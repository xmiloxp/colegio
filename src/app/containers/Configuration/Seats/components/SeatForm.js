import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import TextField from '../../../../shared/components/form/TextField';
import CheckBoxField from '../../../../shared/components/form/CheckBox';
import PageLoading from '../../../../shared/components/PageLoading';
import RegionField from '../../../../shared/components/form/RegionField';

//redux
import { setCodDep, setCodPro } from '../../../../redux/actions/ubigeo';
import { getDepartments, getProvinces, getDistricts } from '../../../../redux/selectors/ubigeo';

// utils
import { normalizePhone } from '../../../../utils/utils';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'name',
      'codDep',
      'codPro',
      'codDis',
      'address',
      'phone'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

class SeatForm extends PureComponent {

    getProvincesWithCodeDep = (value) => {
        this.props.setCodDep(value)
    }
    
    getDistrictWithCodeProv = (value) =>{
        this.props.setCodPro(value)
    }

    render() {
        const { handleSubmit, departments, provinces, districts, pristine, submitting, invalid, reset } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Nombre</span>
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
                            <span className="form__form-group-label">Teléfono</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="phone"
                                    type="text"
                                    normalize={normalizePhone}
                                    component={TextField} 
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <div className="form__form-group-field">
                                <Field
                                    name="main"
                                    component={CheckBoxField}
                                    label="Principal"
                                    color="primary"
                                    className="colored-click"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
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
                    <Col md={8}>
                        <div className="form__form-group">
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
                <Row>
                    <Col md={12}>
                        <Button color="primary" type="submit" size="sm" disabled={invalid || pristine || submitting}>Guardar</Button>
                        <Button disabled={pristine || submitting} onClick={reset} size="sm">Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}

SeatForm.propTypes = {
    departments: PropTypes.array.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    setCodDep: PropTypes.func.isRequired,
    setCodPro: PropTypes.func.isRequired,
}

SeatForm.defaultProps = {
    departments: [],
    provinces: [],
    districts: []
}
const SeatFormEdit = reduxForm({
    form: 'seat_form',
    validate
})(SeatForm);

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
});

export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
})(setPropsAsInitial(SeatFormEdit));
