import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import { Col, Row, Card, CardBody, Button } from 'reactstrap';
import TextField from './TextField';
import SelectField from './Select';
import TablePayout from '../Payout/TablePayout';

const validate = values => {
    const errors = {};
    // const requiredFields = [
    //   'employee',
    //   'service',
    //   ''
    // ];
    // requiredFields.forEach(field => {
    //   if (!values[field]) {
    //     errors[field] = 'Requerido';
    //   }
    // });

    return errors;
}

const suggestionsEmployee = [
    { value:'1', label: '45765332 | Victor Urbina Eugenio' },
    { value:'2', label: '55765333 | Juan Perez' },
    { value:'3', label: '65765334 | Pablito Campos' },
];
const suggestionsService = [
    { value:'1', label: 'Luz' },
    { value:'2', label: 'Agua' },
    { value:'3', label: 'Otros' },
];
class PayoutForm extends Component {

    renderDetails = (props) => {
        const { fields, meta: {error, submitFailed}} = props;
        const { detail } = this.props;
        console.log(detail)
        return (
            <Row>
                <Col md={12}>
                    <div className="form__form-group">
                        <span className="form__form-group-label">Servicio</span>
                        <div className="form__form-group-field">
                            <Field 
                                name={`detail.service`}
                                component={SelectField} 
                                options={suggestionsService}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="form__form-group">
                        <span className="form__form-group-label">Monto</span>
                        <div className="form__form-group-field">
                            <Field 
                                name={`detail.amount`}
                                component={TextField} 
                            />    
                        </div>
                    </div>                    
                </Col>
            </Row>
        );
    }

    setDetails = ( ) =>{
        console.log("detail");
        const { detail } = this.props;
        if(detail.service && detail.amount){
            this.props.pushArray('PayoutForm', 'details', detail);
            this.props.changeValue('PayoutForm','detail',{});
        }
    };
    removeDetail = index => {
        this.props.removeArray('PayoutForm', 'details', index);
    }
    render() {

        const { handleSubmit, details, detail } = this.props;
        console.log(details);
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8}>
                        <FieldArray name="details"
                            component={this.renderDetails}
                        />
                        <Col md={4}>
                            <button type="button" onClick={this.setDetails}>Agregar</button>
                        </Col>
                        <Row>
                            <Col md={12}>
                                <TablePayout
                                    values={details}
                                    onRemoveDetail={this.removeDetail}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Empleado</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name={`detail.employee`}
                                    component={SelectField} 
                                    options={suggestionsEmployee}
                                />    
                            </div>
                        </div>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Grado</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="grade"
                                    component={TextField} 
                                />    
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button color="primary" size="small" type="submit">Guardar</Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

const selector = formValueSelector('PayoutForm');
const mapStateToProps = state => ({
    details: selector(state,'details'),
    detail: selector(state, 'detail')
});
const PayoutFormEdit = reduxForm(
    {
      form: 'PayoutForm',
      validate
    }
  )(PayoutForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
})(PayoutFormEdit);
