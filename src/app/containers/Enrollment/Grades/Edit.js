import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//componnets
import BasicForm from '../../../shared/components/form/BasicForm';
import PageLoading from '../../../shared/components/PageLoading';
import CardTitle from '../../../shared/components/CardTitle';

//redux
import { getGradeById } from '../../../redux/selectors/grade';
import { updateGrade, fetchGrades } from '../../../redux/actions/grade';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class GradeEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sweet:{
        show: false,
        back: false
      }
    };
  }
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if (!this.props.level) {
      this.props.fetchGrades();
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateGrade(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { grade } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar grado"/>
              <BasicForm 
                data={grade} 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
            { !grade && <PageLoading />}
          </Card>
        </Col>
      </Row>
    );
  }
}

GradeEdit.propTypes = {
  grade: PropTypes.object,
  updateGrade: PropTypes.func.isRequired,
  fetchGrades: PropTypes.func.isRequired,
}
const mapStateToProps = (state, props) => ({
  grade : getGradeById(state, props.match.params.identifier)
})
export default withRouter(connect(mapStateToProps,{
  updateGrade,
  fetchGrades
})(GradeEdit));