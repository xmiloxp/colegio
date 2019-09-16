import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import PageLoading from '../../../shared/components/PageLoading';
import SeatForm from './components/SeatForm';

// redux
import { updateSeat, fetchSeats } from '../../../redux/actions/seat';
import { getSeatById } from '../../../redux/selectors/seat';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class SeatEdit extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if(!this.props.seat) {
      this.props.fetchSeats();
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.seat !== this.props.seat) {
      this.setState({ loading: false });
    }
  }
  
  handleSubmit = values => {
    const { identifier } = values;
    return this.props.updateSeat(identifier, values).then(r => {
      notificationSuccess(notification);
      this.props.history.goBack();
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
   const { seat } = this.props;
   const { loading } = this.state;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Actualizando sede" />
              <SeatForm 
                data={seat} 
                onSubmit={this.handleSubmit} 
              />
            </CardBody>
            { loading && <PageLoading /> }                
          </Card>
        </Col>
      </Row>
    );
  }
}

SeatEdit.propTypes = {
  fetchSeats: PropTypes.func.isRequired,
  updateSeat: PropTypes.func.isRequired,
  seat: PropTypes.object,
}

const mapStateToProps = (state, props) => ({
  seat: getSeatById(state, props.match.params.identifier)
})

export default withRouter(connect(mapStateToProps,{
  fetchSeats,
  updateSeat
})(SeatEdit));