import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';
import DatePickerField from '../CustomInput/DatePickerField';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'concept',
      'level',
      'initdate',
      'enddate',
      'amount',
      'amountextra'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }
  const suggestions = [
    { label: 'Inicial' },
    { label: 'Primaria' },
    { label: 'Secundaria' },
    ].map(suggestion => ({
        value: suggestion.label,
        label: suggestion.label,
      }));
class MonthlyPaymentForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={12}>
                        <Field 
                            name="concept"
                            label="Concepto"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="level"
                            label="Nivel"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={suggestions} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="initdate"
                            label="Fecha inicio"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="enddate"
                            label="Fecha fin"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="amount"
                            label="Monto"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="amountextra"
                            label="Monto fuera de tiempo"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={4}>
                        <RegularButton color="info" type="submit">Guardar</RegularButton>
                    </GridItem>
                </GridContainer>
            </form>
        );
    }
}
const MonthlyPaymentFormEdit = reduxForm(
    {
      form: 'MonthlyPaymentForm',
      validate
    }
  )(MonthlyPaymentForm);
export default connect()(MonthlyPaymentFormEdit);
