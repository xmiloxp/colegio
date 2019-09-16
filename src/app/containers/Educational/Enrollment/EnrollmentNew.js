import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import EnrollmentForm from './components/EnrollmentForm';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { insertEnrollment } from '../../../redux/actions/enrollment';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class EnrollmentNew extends Component {

    componentDidMount() {
        NotificationSystem.newInstance({}, n => notification = n);
    }
    

    handleSubmit = values => {
        return this.props.insertEnrollment(values).then(r =>{
            notificationSuccess(notification);
            this.props.history.goBack();
        }).catch(r => {
            notificationError(notification, r);
        });
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <CardTitle title="Matricula" />
                            <EnrollmentForm onSubmit={this.handleSubmit}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
EnrollmentNew.propTypes = {
    insertEnrollment: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {
    insertEnrollment
})(EnrollmentNew));