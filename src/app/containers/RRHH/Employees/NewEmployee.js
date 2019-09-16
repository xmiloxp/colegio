import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//components
import CardTitle from '../../../shared/components/CardTitle';
import EmployeeForm from './components/EmployeeForm';

//redux
import { insertEmployee } from '../../../redux/actions/employee';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class NewEmployee extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);      
   
  }

  handleSubmit = values => {
    values.state = 1;
    values.identityDocument= 1;
    return this.props.insertEmployee(values).then(r => {
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
              <CardTitle title="Registro de Personal" />
              <EmployeeForm 
                onSubmit={this.handleSubmit}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
NewEmployee.propTypes = {
  insertEmployee: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertEmployee
})(NewEmployee));