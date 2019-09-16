import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../../redux/actions/user';
import DataTable from '../../../shared/components/table/DataTable';
import Modal from '../../../shared/components/Modal';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';
import { notificationSuccess, notificationError } from '../../../utils/utils';
import CardTitle from '../../../shared/components/CardTitle';

let notification;
class Users extends Component {
  constructor(props) {
    super(props);
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
      title: 'Personal',
      dataIndex: 'name',
    },
    {
        title: 'Usuario',
        dataIndex: 'username',
    },
    {
        title: 'Roles',
        dataIndex: 'role_names',
    },
    {
        title: 'Estado',
        dataIndex: 'active',
        render: value => <Badge color={value ? 'primary': 'secondary'}>{value ? 'Activo': 'Inactivo'}</Badge>
    },
    {
      title: 'Acciones',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
            <Fragment>
              <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/users/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
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
      )
    }
  ];

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if ( this.props.users.length === 0 ) this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Usuario">
                  <ButtonToolbar className="btn-toolbar-top">
                    <Link className="btn btn-primary" to="/administration/users/new">Nuevo</Link>  
                  </ButtonToolbar>
              </CardTitle>
              <DataTable data={users} columns={this.columns}> </DataTable>
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

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}

Users.defaultProps = {
  users: []
}
const mapStateToProps = state => ({
    users: state.user.data,
  });
  
export default connect(mapStateToProps,{
  fetchUsers,
  // deleteLevel
})(Users);
