import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//components
import CardTitle from '../../../shared/components/CardTitle';
import StudentForm from './components/StudentForm';

//redux
import { insertStudent } from '../../../redux/actions/student';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

// constants
import { SUBJECT_TYPE_STUDENT } from '../../../Constants';

let notification;
class NewStudent extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);   
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_STUDENT;
    values.state = 1;
    values.identityDocument= 1;
    values.parents = [];
    if(values.father){
      values.parents.push(values.father);
    }
    if(values.mother){
      values.parents.push(values.mother);
    }
    if(values.parent){
      values.parents.push(values.parent);
    }

    return this.props.insertStudent(values).then(res => {
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
              <CardTitle title="Registro de alumnos" />
              <StudentForm 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

NewStudent.propTypes = {
  insertStudent: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertStudent
})(NewStudent));