import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

// components
import SelectField from '../../../../shared/components/form/Select';
import TextField from '../../../../shared/components/form/TextField';
import DecimalField from '../../../../shared/components/form/DecimalField';
import PageLoading from '../../../../shared/components/PageLoading';

// redux
import { loadTypediscount } from '../../../../redux/actions/complement';

// utils
import { normalizeDecimal } from '../../../../utils/utils';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'promotiontypeId',
      'name',
      'amount',
      'description'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

class DiscountForm extends Component {
    componentDidMount() {
        this.props.loadTypediscount();
    }
    
    render() {
        const { handleSubmit, typediscounts, invalid, pristine, submitting, reset } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Tipo</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="promotiontypeId"
                                    component={SelectField}
                                    options={typediscounts}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Nombre</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="name"
                                    component={TextField} 
                                />    
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Monto</span>
                            <div>
                                <Field 
                                    name="amount"
                                    component={DecimalField}
                                    normalize={normalizeDecimal}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Descripción</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="description"
                                    component={TextField} 
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
DiscountForm.propTypes = {
    loadTypediscount: PropTypes.func.isRequired,
    typediscounts: PropTypes.array,
}

DiscountForm.defaultProps = {
    typediscounts: []
}
const DiscountFormEdit = reduxForm(
    {
      form: 'discount_form',
      validate
    }
)(DiscountForm);

const mapStateToProps = state => ({
    typediscounts: state.complement.typediscounts
})
export default connect(mapStateToProps,{
    loadTypediscount
})(setPropsAsInitial(DiscountFormEdit));
