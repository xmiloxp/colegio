import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//components
import CardTitle from '../../../shared/components/CardTitle';
import MonthlypaymentForm from './components/MonthlypaymentForm';

let notification;
class MonthlypaymentNew extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values => {

  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle tilte="Pago de matricula" />
              <MonthlypaymentForm
                onSubmit={this.handleSubmit}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}


MonthlypaymentNew.propTypes = {

};


export default MonthlypaymentNew;