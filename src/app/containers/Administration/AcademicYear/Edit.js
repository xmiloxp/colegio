import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import PageLoading from '../../../shared/components/PageLoading';
import AcademicYearForm from './components/AcademicYearForm';

// redux
import { getAcademiyearById } from '../../../redux/selectors/academicyear';
import { fetchAcademicYears, updateAcademicYear } from '../../../redux/actions/academicYear';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class AcademicYearEdit extends Component {

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if(!this.props.academicyear){
      this.props.fetchAcademicYears();
    }
  }

  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateAcademicYear(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
   const { academicyear } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Editar año académico" />
              <AcademicYearForm              
                data={academicyear} 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
          { !academicyear && <PageLoading /> }          
        </Col>
      </Row>
    );
  }
}

AcademicYearEdit.propTypes = {
  academicYear: PropTypes.object,
  updateAcademicYear: PropTypes.func.isRequired,
  fetchAcademicYears: PropTypes.func.isRequired,
}
const mapStateToProps = (state, props) => ({
  academicyear: getAcademiyearById(state, props.match.params.identifier),
})

export default withRouter(connect(mapStateToProps,{
  fetchAcademicYears,
  updateAcademicYear
})(AcademicYearEdit));