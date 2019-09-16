import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import NotificationSystem from 'rc-notification';

//components
import CompanyForm from './components/CompanyForm';
import PageLoading from '../../../shared/components/PageLoading';

// constants
import { SUBJECT_TYPE_ENTERPRISE, IDENTITY_DOCUMENT_RUC, SEX_SAC, STATE_ACTIVO } from '../../../Constants';

//redux
import { fetchEnterprise, insertEnterprise, updateEnterprise } from '../../../redux/actions/enterprise';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Company extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            show: false
        };
    }
    componentDidMount() {
        NotificationSystem.newInstance({}, n => notification = n);
        if(!Object.keys(this.props.enterprise).length) {
            this.setState({
                loading: true
            })
            this.props.fetchEnterprise().then(response => {
                this.setState({
                    loading: false
                })
            }).catch(e => {
                this.setState({
                    loading: false
                })
            });
        }
    }
    
    handleSubmit = values => {
        values.subjectType = SUBJECT_TYPE_ENTERPRISE;
        values.state = STATE_ACTIVO;
        values.sex = SEX_SAC;
        values.identityDocument= IDENTITY_DOCUMENT_RUC;
        if(!values.identifier){
            return this.props.insertEnterprise(values).then(r => {
                // this.props.fetchEnterprise();
                notificationSuccess(notification);
            }).catch(r => {
                notificationError(notification, r);
              });
        }else{
            return this.props.updateEnterprise(values).then(r => {
                // this.props.fetchEnterprise();
                notificationSuccess(notification);
            }).catch(r => {
                notificationError(notification, r);
            });
        }
    }
    

    render() {
        const {enterprise} = this.props;
        const { loading } = this.state;
        return (
            <Row>
                <Col md={12} lg={12}>
                    <Card>
                        <CardBody>
                            <div className="card__title">
                                <h5 className="bold-text">Empresa</h5>
                            </div>
                            <CompanyForm
                                data={enterprise}
                                onSubmit={this.handleSubmit}
                            />
                            {loading && <PageLoading />}
                        </CardBody>
                    </Card>
                </Col>
            </Row>            
        );
    }
}

Company.propTypes = {
    enterprise: PropTypes.object,
    fetchEnterprise: PropTypes.func.isRequired,
    insertEnterprise: PropTypes.func.isRequired,
    updateEnterprise: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    enterprise: state.enterprise
});
export default connect(mapStateToProps,{
    fetchEnterprise,
    insertEnterprise,
    updateEnterprise
})(Company);