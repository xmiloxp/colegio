import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import PageLoading from '../../../shared/components/PageLoading';
import CardTitle from '../../../shared/components/CardTitle';
import BasicForm from '../../../shared/components/form/BasicForm';

// redux 
import { getCashBoxById } from '../../../redux/selectors/cashbox';
import { updateCashbox, fetchCashboxes } from '../../../redux/actions/cashbox';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class CashboxEdit extends Component {
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.cashbox) {
      this.props.fetchCashboxes();   
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateCashbox(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { cashbox } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar caja" />
              <BasicForm 
                data={cashbox} 
                onSubmit={this.handleSubmit}
              /> 
            </CardBody>
            { !cashbox && <PageLoading />}
          </Card>
        </Col>
      </Row>
    );
  }
}

CashboxEdit.propTypes = {
  cashbox: PropTypes.object,
  updateCashbox: PropTypes.func.isRequired,
  fetchCashboxes: PropTypes.func.isRequired,
};
const mapSateToProps = ( state, props) => ({
  cashbox : getCashBoxById(state, props.match.params.identifier)
});

export default withRouter(connect(mapSateToProps,{
  updateCashbox,
  fetchCashboxes
})(CashboxEdit));
