import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import { Col, Row, Card, CardBody,Button } from 'reactstrap';

import TextField from './TextField';
import TablePayout from '../Payout/TablePayout';
import DatePickerField from './DatePicker';
import SelectField from './Select';

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

class SalarieForm extends Component {

    renderDetails = (props) => {
        const { fields, meta: {error, submitFailed}} = props;
        const { detail } = this.props;
        console.log(detail)
        return (
            <Row>
                <Col md={12}>
                    <div className="form__form-group">
                        <span className="form__form-group-label">Trabajador</span>
                        <div className="form__form-group-field">
                            <Field 
                                name={`detail.employee`}
                                component={SelectField} 
                                options={suggestionsEmployee}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={12}>
                    <div className="form__form-group">
                        <span className="form__form-group-label">Fecha</span>
                        <div className="form__form-group-field">
                            <Field 
                                name={`detail.fecha`}
                                component={DatePickerField} 
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
            this.props.pushArray('SalarieForm', 'details', detail);
            this.props.changeValue('SalarieForm','detail',{});
        }
    };
    removeDetail = index => {
        this.props.removeArray('SalarieForm', 'details', index);
    }
    render() {

        const { handleSubmit, details, detail } = this.props;
        console.log(details);
        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col md={12}>
                        <FieldArray name="details"
                            component={this.renderDetails}
                        />
                        <Col>
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
                    {/* <Col md={4}>
                        <Field 
                            name={`detail.employee`}
                            component={Autocomplete} 
                            label="Empleado"
                            formControlProps={{
                                fullWidth: true
                              }}
                            suggestions={suggestionsEmployee}
                        />
                        <Field 
                            name="grade"
                            label="Grado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </Col> */}
                </Row>
                <Row>
                    <Col md={4}>
                        <Button color="primary" size="sm" type="submit">Guardar</Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

const selector = formValueSelector('SalarieForm');
const mapStateToProps = state => ({
    details: selector(state,'details'),
    detail: selector(state, 'detail')
});
const SalarieFormEdit = reduxForm(
    {
      form: 'SalarieForm',
      validate
    }
  )(SalarieForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
})(SalarieFormEdit);
