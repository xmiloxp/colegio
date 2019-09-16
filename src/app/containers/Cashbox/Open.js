import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Col, Row, Card, CardBody } from 'reactstrap';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../shared/components/CardTitle';
import OpenCashboxForm from './components/OpenCashboxForm';


// redux 
import { openCashbox } from '../../redux/actions/cashflow';
import { notificationSuccess, notificationError } from '../../utils/utils';

// utils

let notification;
class Open extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values => {
    return this.props.openCashbox(values).then( r => {
      console.log(r)
      notificationSuccess(notification);
    }).catch(r => {
      console.log(r)
      notificationError(notification, r.error);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Abrir Caja" />
              <OpenCashboxForm onSubmit={this.handleSubmit} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Open.propTypes = {

};

export default withRouter(connect(null,{
  openCashbox
})(Open));