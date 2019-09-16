import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// component
import CardTitle from '../../../shared/components/CardTitle';
import AcademicYearForm from './components/AcademicYearForm';

// redux
import { insertAcademicYear } from '../../../redux/actions/academicYear';

// utils
import { formatDate } from '../../../utils/utils';
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class AcademicYearNew extends Component {
  
  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
  }

  handleSubmit = values => {
    values.initdate = formatDate(values.initdate);
    values.enddate = formatDate(values.enddate);

    return this.props.insertAcademicYear(values).then(res => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Registro de nuevo año académico" />
              <AcademicYearForm 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
AcademicYearNew.propTypes = {
  insertAcademicYear: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertAcademicYear
})(AcademicYearNew));