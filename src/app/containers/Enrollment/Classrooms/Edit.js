import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import PageLoading from '../../../shared/components/PageLoading';
import ClassroomForm from './components/ClassroomForm';

// redux
import { getClassrommById } from '../../../redux/selectors/classroom';
import { fetchClassrooms, updateClassroom } from '../../../redux/actions/classroom';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class ClassroomEdit extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.classroom) {
      this.props.fetchClassrooms();
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateClassroom(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
   const { classroom } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar aula" />
              <ClassroomForm 
                data={classroom} 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
            { !classroom && <PageLoading />}  
          </Card>
        </Col>
      </Row>
    );
  }
}
ClassroomEdit.propTypes = {
  classroom: PropTypes.object,
  updateClassroom: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
}
const mapStateToProps = (state, props) => ({
  classroom: getClassrommById(state, props.match.params.identifier),
})
export default withRouter(connect(mapStateToProps,{
  fetchClassrooms,
  updateClassroom
})(ClassroomEdit));
