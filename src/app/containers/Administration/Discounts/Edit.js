import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import NotificationSystem from 'rc-notification';
import { withRouter } from 'react-router-dom';

// components
import PageLoading from '../../../shared/components/PageLoading';
import DiscountForm from './components/DiscountForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { getDiscountById } from '../../../redux/selectors/discount';
import { fetchDiscounts, updateDiscount } from '../../../redux/actions/discount';

// utils
import { notificationError, notificationSuccess } from '../../../utils/utils';

let notification;
class Edit extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.discount) {
      this.props.fetchDiscounts();   
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateDiscount(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }
  
  render() {
    const { discount } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar descuento" />
              <DiscountForm
                data={discount}
                onSubmit={this.handleSubmit}
              />
            </CardBody>
            { !discount && <PageLoading />}
          </Card>
        </Col>
      </Row>
    );
  }
}

Edit.propTypes = {
  discount: PropTypes.object,
  updateDiscount: PropTypes.func.isRequired,
  fetchDiscounts: PropTypes.func.isRequired,
};
const mapStateToProps = (state, props) => ({
  discount: getDiscountById(state, props.match.params.identifier)
})

export default withRouter(connect(mapStateToProps, {
  updateDiscount,
  fetchDiscounts
})(Edit));