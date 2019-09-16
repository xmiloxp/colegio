import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import BasicForm from '../../../shared/components/form/BasicForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { insertCashbox } from '../../../redux/actions/cashbox';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class CashboxNew extends Component {
 
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }

  handleSubmit = values => {
    return this.props.insertCashbox(values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Registro nueva caja" />
              <BasicForm 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
CashboxNew.propTypes = {
  insertCashbox: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertCashbox
})(CashboxNew));