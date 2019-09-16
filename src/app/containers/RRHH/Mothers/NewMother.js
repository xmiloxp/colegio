import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import ParentForm from '../components/ParentForm';

// redux
import { insertMother } from '../../../redux/actions/mother';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

// constants
import { SUBJECT_TYPE_MOTHER } from '../../../Constants';

let notification;
class NewMother extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);      
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_MOTHER;
    values.state = 1;
    values.sex = 2;
    values.identityDocument= 1;
    return this.props.insertMother(values).then(res => {
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
              <CardTitle title="Registro de madres" />
              <ParentForm 
                onSubmit={this.handleSubmit}
                subjectType={SUBJECT_TYPE_MOTHER}
                textAlert="una madre"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
NewMother.propTypes = {
  insertMother: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertMother
})(NewMother));