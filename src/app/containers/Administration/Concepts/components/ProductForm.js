import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import SelectField from '../../../../shared/components/form/Select';
import DecimalField from '../../../../shared/components/form/DecimalField';
import TextField from '../../../../shared/components/form/TextField';
import PageLoading from '../../../../shared/components/PageLoading';

// redux
import { loadDiscount } from '../../../../redux/actions/complement';

// utils
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';
import { normalizeDecimal } from '../../../../utils/utils';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'product',
      'price',
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class ProductForm extends Component {
    componentDidMount() {
        this.props.loadDiscount();
    }
    
    render() {
        const { handleSubmit, pristine, submitting, invalid, reset, discounts } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Concepto</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="name"
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
                            <span className="form__form-group-label">Costo</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="price"
                                    component={DecimalField}
                                    normalize={normalizeDecimal}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Descuento</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="promotionId"
                                    component={SelectField}
                                    options={discounts}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button disabled={ invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
                        <Button disabled={ pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}
ProductForm.propTypes = {
    discounts: PropTypes.array,
    loadDiscount: PropTypes.func.isRequired,
}
ProductForm.defaultProps = {
    discounts: []
}
const ProductFormEdit = reduxForm(
    {
      form: 'product_form',
      validate
    }
  )(ProductForm);

const mapStateToProps = state => ({
    discounts: state.complement.discounts
})
export default connect(mapStateToProps,{
    loadDiscount
})(setPropsAsInitial(ProductFormEdit));
