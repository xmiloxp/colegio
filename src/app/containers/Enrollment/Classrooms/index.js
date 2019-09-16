import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';

//redux
import { getClassrooms } from '../../../redux/selectors/classroom';
import { fetchClassrooms, deleteClassroom } from '../../../redux/actions/classroom';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Classrooms extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      identifier: ''
    };
  }
  columns = [
    {
      title: 'N°',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Nivel',
      dataIndex: 'levelname',
    },
    {
      title: 'Grado',
      dataIndex: 'gradename',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      render: value => <Badge color={value ? 'success': 'danger'}>{value ? 'Activo': 'Inactivo'}</Badge>
    },

    // {
    //   title: 'Sección',
    //   dataIndex: 'classroom',
    // },
    // {
    //   title: 'Capacidad',
    //   dataIndex: 'capacity',
    // },
    {
      title: 'Acciones',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
            <Fragment>
              <Link className="btn btn-success" id={`edit-${index}`} to={`/enrollment/classrooms/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
              <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                Editar
              </UncontrolledTooltip>
            </Fragment>
            <Fragment>
              <Button color="danger" id={`delete-${index}`} onClick={() => this.setState({show:true, identifier: record.identifier})}>
                <DeleteForeverIcon />
              </Button>
              <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                Eliminar
              </UncontrolledTooltip>
            </Fragment>
          </ButtonGroup>
        </ButtonToolbar>
      ),
    },
  ];

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if ( this.props.classrooms.length === 0) {
      this.props.fetchClassrooms();
    }
  }

  delete = id => {
    this.props.deleteClassroom(id).then(r =>{
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { classrooms } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Aulas">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/enrollment/classrooms/new">Nuevo</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                data={classrooms}
                columns={this.columns}
              />
            </CardBody>
          </Card>            
        </Col>
        <Modal
          show={this.state.show}
          title="Advertencia"
          color="warning"
          menssage={"¿Seguro que desea realizar la acción?"}
          showCancelButton={true}
          onClose={() => this.setState({show: false})}
          onConfirm={() => {
            this.setState({show:false});
            this.delete(this.state.identifier);
          }}
          onCancel={
            () => {
              this.setState({show:false})
            }
          }
        />
      </Row>
    );
  }
}

Classrooms.propTypes = {
  fetchClassrooms: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired,
  classrooms: PropTypes.array.isRequired,
}

Classrooms.defaultProps = {
  classrooms: []
}
const mapStateToPros = state => ({
    classrooms: getClassrooms(state)
})

export default connect(mapStateToPros,{
    fetchClassrooms,
    deleteClassroom
})(Classrooms);





