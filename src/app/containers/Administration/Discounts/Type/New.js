import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import NotificationSystem from 'rc-notification';
import { withRouter } from 'react-router-dom';

// components
import CardTitle from '../../../../shared/components/CardTitle';
import BasicForm from '../../../../shared/components/form/BasicForm';

// redux
import { insertTypediscount } from '../../../../redux/actions/typediscount';

// utils
import { notificationError, notificationSuccess } from '../../../../utils/utils';

let notification;
class TypeDiscountNew extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values => {
    return this.props.insertTypediscounts(values).then(r => {
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
              <CardTitle title="Nuevo tipo de descuento" />
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

TypeDiscountNew.propTypes = {
  insertTypediscount: PropTypes.func.isRequired,
};

export default withRouter(connect(null,{
  insertTypediscount
})(TypeDiscountNew));