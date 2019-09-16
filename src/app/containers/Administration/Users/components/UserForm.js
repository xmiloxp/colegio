import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from '../../../../shared/components/form/TextField';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';
import { loadEmployees, loadRoles } from '../../../../redux/actions/complement';
import MultiCheckBoxField from '../../../../shared/components/form/MultiCheckBox';
import { Row, Col, Button } from 'reactstrap';
import PageLoading from '../../../../shared/components/PageLoading';
import SelectField from '../../../../shared/components/form/Select';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'dni',
      'identityNumber',
      'adrress',
      'phone',
      'email'
    ];
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Correo electronico no valido';
    }
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
        };
      }

    componentDidMount() {
        this.props.loadEmployees();
        this.props.loadRoles();
    }
    
    render() {
        const { handleSubmit, employees, roles, pristine, submitting, reset, invalid } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">DNI</span>
                            <div className="from__form-group-field">
                                <Field 
                                    name="employee_id"
                                    component={SelectField}
                                    options={employees}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Usuario</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="username"
                                    component={TextField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Contraseña</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="password"
                                    component={TextField} 
                                />
                            </div>
                        </div>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Email</span>
                            <div className="form__form_group_field">
                                <Field
                                    name="email"
                                    component={TextField}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Roles</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="roles"
                                    component={MultiCheckBoxField}
                                    options={roles}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button disabled={invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
                        <Button disabled={pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}
const UserFormEdit = reduxForm(
    {
      form: 'user_form',
      validate,
    }
)(UserForm);

const mapStateToProps = state => ({
    employees: state.complement.employees,
    roles: state.complement.roles,
});
export default connect(mapStateToProps,{
    loadEmployees,
    loadRoles,
})(setPropsAsInitial(UserFormEdit));
