import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import SeatForm from './components/SeatForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { insertSeat } from '../../../redux/actions/seat';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class SeatNew extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }

  handleSubmit = values => {
    return this.props.insertSeat(values).then(r => {
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
              <CardTitle title="Registrar nueva sede" />
              <SeatForm 
                onSubmit={this.handleSubmit} 
              /> 
             </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

SeatNew.propTypes = {
  insertSeat: PropTypes.func.isRequired,
}

export default withRouter(connect(null, { insertSeat })(SeatNew));