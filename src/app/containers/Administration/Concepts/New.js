import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import ProductForm from './components/ProductForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { insertConcept } from '../../../redux/actions/product';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class ConceptNew extends Component {
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);   
  }

  handleSubmit = values => {
    return this.props.insertConcept(values).then(r => {
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
              <CardTitle title="Registrar concepto" />
              <ProductForm 
                onSubmit={this.handleSubmit} 
              /> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
ConceptNew.propTypes = {
  insertConcept: PropTypes.func.isRequired,
}

export default withRouter(connect(null,{
  insertConcept
})(ConceptNew));