import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Row, Col, Button, Table } from 'reactstrap';
import CalendarCheckIcon from 'mdi-react/CalendarCheckIcon';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';

// components
import DatePickerField from '../../../../shared/components/form/DatePicker';
import PageLoading from '../../../../shared/components/PageLoading';
import SelectField from '../../../../shared/components/form/Select';

const validate = values => {
  const errors = {};
  const requiredFields = [
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  })
  return errors;
}

class EnrollmentForm extends Component {
  componentDidMount() {
    this.props.registerInput('enrollment_form', 'details','Field');
    this.props.changeValue( 'enrollment_form', 'details', []);
  }
  
  render() {
    const { handleSubmit, invalid, pristine, submitting, reset, 
            students, parents, detailList, total, concepts } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <div className="form__form-group">
              <span className="form__form-group-label">Fecha</span>
              <div className="form__form-group-field">
                <Field 
                  name="period"
                  component={DatePickerField}
                  disabled={true}
                  today={true}
                />
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div className="form__form-group">
              <span className="form__form-group-label">Alumno</span>
              <div className="form__form-group-field">
                <Field 
                  name="studentId"
                  component={SelectField}
                  options={students}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="form__form-group">
              <span className="form__form-group-label">Responsable</span>
              <div className="form__form-group-field">
                <Field 
                  name="parentId"
                  component={SelectField}
                  options={parents}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="form__form-group">
              <span className="form__form-group-label">Concepto</span>
              <div className="form__form-group-field">
                <Field 
                  name="parentId"
                  component={SelectField}
                  options={concepts}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h6>Detalle</h6>
            <Table className="table--bordered" responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Concepto</th>
                  <th>Monto</th>
                  <th>Mora</th>
                  <th>Descuento</th>
                  <th>Subtotal</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {detailList.map((detail, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{detail.name}</td>
                    <td>{detail.price}</td>
                    <td>{detail.delay}</td>
                    <td>{detail.discount}</td>
                    <td>{detail.total}</td>
                    <td>
                      <button className="table-btn">
                        <DeleteForeverIcon /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>Total</td>
                  <td>{total}</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Button disabled={ invalid || pristine || submitting } color="primary" size="sm" type="submit">Guardar</Button>
            <Button disabled={submitting || pristine}  size="sm" onClick={reset} >Cancelar</Button>
          </Col>
        </Row>
        { submitting && <PageLoading />}
      </form>
    );
  }
}

EnrollmentForm.propTypes = {
  students: PropTypes.array.isRequired,
  detailList: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  concepts: PropTypes.array.isRequired,
};

EnrollmentForm.defaultProps = {
  detailList: [],
  students: [],
  parents: [],
  concepts: []
}
const selector = formValueSelector('enrollment_form');
const mapStateToProps = state => ({
  detailList: selector(state,'details'),
});
const EnrollmentFormEdit = reduxForm(
  {
    form: 'enrollment_form',
    validate
  }
)(EnrollmentForm);
export default connect(mapStateToProps,{
  changeValue: change,
  // removeArray: arrayRemove,
  registerInput: registerField
})(EnrollmentFormEdit);
