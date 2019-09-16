import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//componets
import CardTitle from '../../../shared/components/CardTitle';
import RepresentativeForm from './components/RepresentativeForm';

//redux
import { insertParent } from '../../../redux/actions/parent';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

//constants
import { SUBJECT_TYPE_PARENT } from '../../../Constants';

let notification;
class NewParent extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);      
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_PARENT;
    values.state = 1;
    values.identityDocument= 1;
    return this.props.insertParent(values).then(r => {
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
              <CardTitle title="Registro de Apoderados" />
              <RepresentativeForm 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
NewParent.propTypes = {
  insertParent: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertParent
})(NewParent));