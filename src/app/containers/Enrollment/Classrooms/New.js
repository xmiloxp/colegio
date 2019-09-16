import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//components
import CardTitle from '../../../shared/components/CardTitle';
import ClassroomForm from './components/ClassroomForm';

//redux
import { insertClassroom } from '../../../redux/actions/classroom';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class ClassroomNew extends Component {
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);   
  }

  handleSubmit = values => {
    return this.props.insertClassroom(values).then(res => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      // console.log(r);
      notificationError(notification, r.error);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Registrar nueva aula" />
              <ClassroomForm 
                onSubmit={this.handleSubmit} 
              /> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

ClassroomNew.propTypes = {
  insertClassroom: PropTypes.func.isRequired,
}

export default withRouter(connect(null,{
  insertClassroom
})(ClassroomNew));