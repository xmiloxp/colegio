import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';
import AccountOutlineIcon from 'mdi-react/AccountAddOutlineIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import TextField from '../../../../shared/components/form/TextField';
import PageLoading from '../../../../shared/components/PageLoading';
// import GridContainer from '../../../../shared/components/Grid/GridContainer';
// import GridItem from '../../../../shared/components/Grid/GridItem';
// import TextField from '../../../../shared/components/CustomInput/TextField';
// import Button from "../../../../shared/components/CustomButtons/Button";

const validate = values => {
    const errors = {};
    const requiredFields = [
        'username',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
        errors[field] = 'Requerido';
        }
    });

    return errors;
}

class LogInForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            showPassword: false
        }
    }

    showPassword = (e) => {
        e.preventDefault();
        this.setState({showPassword: !this.state.showPassword})
    }

    render() {
    const { handleSubmit, submitting } = this.props;
    
    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form__form-group">
                <span className="form__form-group-label">Usuario o Email</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <AccountOutlineIcon />
                    </div>
                    <Field
                        name="username"
                        component={TextField}
                        type="text"
                        placeholder="Usuario o Email"
                    />
                </div>
            </div>
            <div className="form__form-group">
                <span className="form__form-group-label">Contraseña</span>
                <div className="form__form-group-field">
                    <div className="form__form-group-icon">
                        <KeyVariantIcon />
                    </div>
                    <Field
                        name="password"
                        component={TextField}
                        type={this.state.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                    />
                    <div
                        className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                        onClick={this.showPassword}
                    ><EyeIcon />
                    </div>
                </div>
    
            </div>
            <div className="account__btns">
                <Button color="primary" className="account__btn" size="sm" type="submit" block disabled={submitting}>Ingresar</Button>
            </div>
            { submitting && <PageLoading />}
        </form>
    );
    }
};
export default reduxForm(
    {
      form: 'log_in_form',
      validate,
    //   submitting
    }
)(LogInForm);