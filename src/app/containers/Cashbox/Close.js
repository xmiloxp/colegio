import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody } from 'reactstrap'
import CardTitle from '../../shared/components/CardTitle';
import CloseCashboxForm from './components/CloseCashboxForm';

class Close extends Component {
  handleSubmit = values => {

  }
  
  render() {
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Cerrar Caja" />
              <CloseCashboxForm onSubmit={this.handleSubmit} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Close.propTypes = {

};

export default Close;