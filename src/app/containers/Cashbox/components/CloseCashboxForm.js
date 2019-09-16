import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button,Table } from 'reactstrap';
import AddIcon from 'mdi-react/AddIcon';
import TrashCanOutlineIcon from 'mdi-react/TrashCanOutlineIcon';
import { Field, reduxForm, FieldArray, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import DecimalField from '../../../shared/components/form/DecimalField';
import TextField from '../../../shared/components/form/TextField';
import { normalizeDecimal, normalizeNumber } from '../../../utils/utils';
import PageLoading from '../../../shared/components/PageLoading';

class CloseCashboxForm extends Component {

  renderTable = (details, removeDetail) => {
    const total = !!details && details.length > 0 ? details.reduce((a,b) => a + (b.coin*b.amount),0): 0;
    return (
      <Fragment>
        <Row>
          <Col md={8}>
            <Table responsive hover className="table--bordered">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>MONEDA</th>
                  <th>CANTIDAD</th>
                  <th>SUBTOTAL</th>
                  <th>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {
                  !!details && details.length > 0 ? 
                    details.map((detail, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{detail.coin}</td>
                        <td>{detail.amount}</td>
                        <td>{detail.coin * detail.amount}</td>
                        <td><Button color="danger" size="sm" onClick={() => removeDetail(i)}><TrashCanOutlineIcon/></Button></td>
                      </tr>
                    ) ) :
                  <tr>
                      <td colSpan={5} align="center">No hay datos aun</td>
                  </tr>
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} align="right">Total</td>
                  <td ><span className="red-text">{total}</span></td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>

      </Fragment>
    );
  }
  renderDetails = ({addDetail}) => {
    return (
      <Row>
        <Col md={4}>
          <div className="form_form-group">
            <span className="form_form-group-label">Moneda</span>
            <div className="form_form-group-field">
              <Field
                name={`detail.coin`}
                component={DecimalField}
                normalize={normalizeDecimal}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form_form-group">
            <span className="form_form-group-label">Cantidad</span>
            <div className="form_form-group-field">
              <Field
                name={`detail.amount`}
                component={TextField}
                normalize={normalizeNumber}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Button onClick={addDetail} color="primary" size="sm"><AddIcon/></Button>
        </Col>
      </Row>
    );
  }

  addDetail = () => {
    const { detail } = this.props;
    if(detail.coin && detail.amount){
      this.props.pushArray('closecash_form', 'details', detail);
      this.props.changeValue('closecash_form', 'detail', {});
    }
  }
  removeDetail = index => {
    this.props.removeArray('closecash_form', 'details', index);
  }
  render() {
    const { handleSubmit, pristine, submitting, reset, invalid, details } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form">
        <Row>
          <Col md={4}>
            <div className="form__form-group">
              <span className="form__form-group-label">Monto inicial</span>
              <div className="from__form-group-field">
                <Field 
                  name="init_amount"
                  component={DecimalField}
                  normalize={normalizeDecimal}
                  disabled={true}
                />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="form__form-group">
              <span className="form__form-group-label">Monto Final</span>
              <div className="from__form-group-field">
                <Field 
                  name="final_amount"
                  component={DecimalField}
                  normalize={normalizeDecimal}
                  disabled={true}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="card__title">
          <h5 className="bold__text">Arqueo</h5>
        </div>
        <Row>
          <Col md={8}>
            <div className="form__form-group">
              <div className="from__form-group-field">
                <FieldArray 
                  name="details"
                  component={this.renderDetails}
                  addDetail={this.addDetail}
                />
              </div>
            </div>
          </Col>
        </Row>
            {
              this.renderTable(details, this.removeDetail)
            }
        <Row>
          <Col>
          <Col md={4}>
            <div className="form__form-group">
              <span className="form__form-group-label">Detalle</span>
              <div className="from__form-group-field">
                <Field 
                  name="description"
                  component={TextField}
                />
              </div>
            </div>
          </Col>
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

CloseCashboxForm.propTypes = {


};
const selector = formValueSelector('closecash_form');
const mapStateToProps = state => ({
  details: selector(state,'details'),
  detail: selector(state, 'detail'),

})

export default connect(mapStateToProps,{
  pushArray: arrayPush,
  changeValue: change,
  removeArray: arrayRemove
})(reduxForm({
  form: 'closecash_form',
  // validate
})(CloseCashboxForm));