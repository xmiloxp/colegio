import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import SyncIcon from 'mdi-react/SyncIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import NotificationSystem from 'rc-notification';

// components
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';
import PageLoading from '../../../shared/components/PageLoading';
import CardTitle from '../../../shared/components/CardTitle';

/// redux
import { getSeats } from '../../../redux/selectors/seat';
import { fetchSeats, setMainSeat, deleteSeat } from '../../../redux/actions/seat';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Seats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModalMain: false,
      showModalDelete: false,
      identifier: '',
      // loading: true
    };
  }

  columns = [
    {
      title: 'N°',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      sort: 'asc'
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      sort: 'asc'
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      sort: 'asc'
    },
    {
      title: 'Agencia',
      dataIndex: 'main',
      sort: 'asc',
      render: value => <Badge color={value ? 'primary': 'secondary'}>{value ? 'Principal': 'Sucursal'}</Badge>
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      sort: 'asc',
      render: value => <Badge color={value ? 'success': 'danger'}>{value ? 'Activo': 'Inactivo'}</Badge>
    },
    {
      title: 'Acciones',
      sort: 'disabled',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
          {
            !record.main && 
            <Fragment>
              <Button color="success" id={`main-${index}`} onClick={() => this.showModalMain(record.identifier)}><SyncIcon /></Button>
              <UncontrolledTooltip placement="top" target={`main-${index}`}>
                Seleccionar como principal
              </UncontrolledTooltip>
            </Fragment>
          }
            <Fragment>
              <Link className="btn btn-warning" id={`edit-${index}`} to={`/configuration/seats/${record.identifier}/edit`}><PencilOutlineIcon /></Link>
              <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                    Editar
              </UncontrolledTooltip>
            </Fragment>
            <Fragment>
              <Button color="danger" id={`delete-${index}`} onClick={() => this.showModalDelete(record.identifier)}>
                <DeleteForeverIcon />
              </Button>
              <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                Eliminar
              </UncontrolledTooltip>
            </Fragment>            
          </ButtonGroup>
        </ButtonToolbar>
      )
    }
  ]

  showModalMain = (identifier) => {
    this.setState({
      showModalMain: true,
      identifier
    })
  }

  showModalDelete = (identifier) => {
    this.setState({
      showModalDelete: true,
      identifier
    })
  }

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if(this.props.seats.length === 0){
      this.props.fetchSeats();
    }
  }

  setMainSeat = (id) => {
    this.props.setMainSeat(id).then(r =>{
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  deleteSeat = (id) => {
    this.props.deleteSeat(id).then(r => {
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const {  seats } = this.props;
    // const { loading } = this.state;
      return (
          <Row>
            <Col md={12} lg={12}>
              <Card>
                <CardBody>
                  <CardTitle title="Sedes">
                    <ButtonToolbar className="btn-toolbar-top">
                      <Link className="btn btn-primary" to="/configuration/seats/new">Nueva Sede</Link>
                    </ButtonToolbar>
                  </CardTitle>
                  <DataTable
                    columns={this.columns}
                    data={seats}
                  />
                </CardBody>
                {/* {loading && <PageLoading />} */}
              </Card>
              <Modal 
                show={this.state.showModalMain}
                color="warning"
                title="Advertencia"
                message="¿Seguro que desea realizar la acción?"
                onClose={() => this.setState({showModalMain: false})}
                onConfirm={() => {
                  this.setState({showModalMain: false})
                  this.setMainSeat(this.state.identifier);
                }}
                showCancelButton={true}
                onCancel={() => this.setState({showModalMain: false})}
              />
              <Modal 
                show={this.state.showModalDelete}
                color="danger"
                title="Advertencia"
                message="¿Seguro que desea realizar la acción?"
                onClose={() => this.setState({showModalDelete: false})}
                onConfirm={() => {
                  this.setState({showModalDelete: false})
                  this.deleteSeat(this.state.identifier);
                }}
                showCancelButton={true}
                onCancel={() => this.setState({showModalDelete: false})}
              />
            </Col>
          </Row>
      );
  }
}
Seats.propTypes = {
  fetchSeats: PropTypes.func.isRequired,
  setMainSeat: PropTypes.func.isRequired,
  seats: PropTypes.array.isRequired,
  deleteSeat: PropTypes.func.isRequired,
}

Seats.defaultProps = {
  seats: []
}

const mapStateToProps = state => ({
    seats: getSeats(state),
});

export default connect(mapStateToProps,{
    fetchSeats,
    setMainSeat,
    deleteSeat
})(Seats);