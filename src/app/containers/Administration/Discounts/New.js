import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import NotificationSystem from 'rc-notification';
import { withRouter } from 'react-router-dom';

// componets
import DiscountForm from './components/DiscountForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { insertDiscount } from '../../../redux/actions/discount';

// utils
import { notificationError, notificationSuccess } from '../../../utils/utils';

let notification;
class New extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values => {
    return this.props.insertDiscount(values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Nuevo descuento" />
              <DiscountForm
                onSubmit={this.handleSubmit}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

New.propTypes = {
  insertDiscount: PropTypes.func.isRequired,
};

export default withRouter(connect(null,{
  insertDiscount
})(New));