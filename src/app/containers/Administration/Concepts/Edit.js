import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import PageLoading from '../../../shared/components/PageLoading';
import ProductForm from './components/ProductForm';

// redux
import { getConceptById } from '../../../redux/selectors/concept';
import { fetchConcepts, updateConcept } from '../../../redux/actions/product';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class ConceptEdit extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if(!this.props.concept) {
      this.props.fetchConcepts();
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateConcept(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
   const { concept } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar concept" />
              <ProductForm 
                data={concept} 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
          { !concept && <PageLoading /> }
        </Col>
      </Row>
    );
  }
}

ConceptEdit.propTypes = {
  concept: PropTypes.object,
  updateConcept: PropTypes.func.isRequired,
  fetchConcepts: PropTypes.func.isRequired,
}
const mapStateToProps = (state, props) => ({
  concept: getConceptById(state, props.match.params.identifier),
})
export default withRouter(connect(mapStateToProps,{
  fetchConcepts,
  updateConcept
})(ConceptEdit));