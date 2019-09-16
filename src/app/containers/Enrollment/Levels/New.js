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
import { insertLevel } from '../../../redux/actions/level';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class LevelNew extends Component {
 
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }

  handleSubmit = values => {
    return this.props.insertLevel(values).then(r => {
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
              <CardTitle title="Registro de nuevo nivel" />
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
LevelNew.propTypes = {
  insertLevel: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertLevel
})(LevelNew));