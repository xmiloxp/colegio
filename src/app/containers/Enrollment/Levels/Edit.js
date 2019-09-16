import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import PageLoading from '../../../shared/components/PageLoading';
import CardTitle from '../../../shared/components/CardTitle';
import BasicForm from '../../../shared/components/form/BasicForm';

// redux 
import { getLevelById } from '../../../redux/selectors/level';
import { updateLevel, fetchLevels } from '../../../redux/actions/level';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class LevelEdit extends Component {
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.level) {
      this.props.fetchLevels();   
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateLevel(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { level } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar nivel" />
              <BasicForm 
                data={level} 
                onSubmit={this.handleSubmit}
              /> 
            </CardBody>
            { !level && <PageLoading />}
          </Card>
        </Col>
      </Row>
    );
  }
}

LevelEdit.propTypes = {
  level: PropTypes.object,
  updateLevel: PropTypes.func.isRequired,
  fetchLevels: PropTypes.func.isRequired,
};
const mapSateToProps = ( state, props) => ({
  level : getLevelById(state, props.match.params.identifier)
});

export default withRouter(connect(mapSateToProps,{
  updateLevel,
  fetchLevels
})(LevelEdit));
