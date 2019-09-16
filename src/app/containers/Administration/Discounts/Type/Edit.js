import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import PageLoading from '../../../../shared/components/PageLoading';
import BasicForm from '../../../../shared/components/form/BasicForm';
import CardTitle from '../../../../shared/components/CardTitle';

// redux
import { getTypediscountById } from '../../../../redux/selectors/typediscount';
import { fetchTypediscounts, updateTypediscount } from '../../../../redux/actions/typediscount';

// utils
import { notificationSuccess, notificationError } from '../../../../utils/utils';

let notification;
class TypeDiscountEdit extends Component {
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.typediscount) {
      this.props.fetchTypediscounts();   
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateTypediscount(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { typediscount } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar tipo de descuento" />
              <BasicForm
                data={typediscount}
                onSubmit={this.handleSubmit}
              />
            </CardBody>
            { !typediscount && <PageLoading />}
          </Card>
        </Col>
      </Row>
    );
  }
}

TypeDiscountEdit.propTypes = {
  typediscount: PropTypes.object,
  updateTypediscount: PropTypes.func.isRequired,
  fetchTypediscounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  typediscount: getTypediscountById(state, props.match.params.identifier)
})

export default withRouter(connect(mapStateToProps, {
  updateTypediscount,
  fetchTypediscounts
})(TypeDiscountEdit));