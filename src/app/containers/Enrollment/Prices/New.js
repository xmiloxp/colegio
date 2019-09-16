import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import ConceptForm from './components/ConceptForm';

// redux
import { insertConceptEnrollment } from '../../../redux/actions/concept';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';


let notification;
class PriceNew extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }
  
  handleSubmit = values => {
    return insertConceptEnrollment(values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r.error);
    })
  }

  render() {
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Nuevo precio para la matricula" />
              <ConceptForm
                onSubmit={this.handleSubmit}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

PriceNew.propTypes = {
};

export default withRouter(connect(null,{
})(PriceNew));