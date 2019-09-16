import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertUser } from '../../../redux/actions/user';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import UserForm from './components/UserForm';
import NotificationSystem from 'rc-notification';
import { notificationSuccess, notificationError } from '../../../utils/utils';
import CardTitle from '../../../shared/components/CardTitle';

let notification;
class UserNew extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);         
  }

  handleSubmit = values => {
    values.employee_id = values.employee_id.value;
    return this.props.insertUser(values).then(res => {
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
              <CardTitle title="Registrar nuevo usuario" />
              <UserForm 
                onSubmit={this.handleSubmit}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
UserNew.propTypes = {
  insertUser: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertUser
})(UserNew));