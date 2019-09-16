import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

//components
import BasicForm from '../../../shared/components/form/BasicForm';

//redux
import { insertGrade } from '../../../redux/actions/grade';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class GradeNew extends Component {
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
  }

  handleSubmit = values => {
    return this.props.insertGrade(values).then(res => {
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
              <div className="card__title">
                <h5 className="bold-text">Registrar un nuevo grado</h5>
              </div>
              <BasicForm 
                onSubmit={this.handleSubmit} 
              /> 
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

GradeNew.propTypes = {
  insertGrade: PropTypes.func.isRequired,
}
export default withRouter(connect(null,{
  insertGrade
})(GradeNew));