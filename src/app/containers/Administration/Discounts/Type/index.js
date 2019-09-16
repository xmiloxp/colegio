import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

// components
import Modal from '../../../../shared/components/Modal';
import CardTitle from '../../../../shared/components/CardTitle';
import DataTable from '../../../../shared/components/table/DataTable';

// redux
import { getTypediscounts } from '../../../../redux/selectors/typediscount';
import { fetchTypediscounts, deleteTypediscount } from '../../../../redux/actions/typediscount';

// utils
import { notificationSuccess, notificationError } from '../../../../utils/utils';

let notification;
class TypeDiscounts extends Component {
  constructor (props) {
    super (props);
    this.state = {
      show: false,
      identifier: ''
    }
  }

  columns = [
    {
      title: 'N°',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Descripción',
      dataIndex: 'name',
      sort: 'asc'
    },
    {
      title: 'Acciones',
      sort: 'disabled',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
            <Fragment>
              <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/typediscounts/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
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
    if(this.props.typediscounts.length === 0) this.props.fetchTypediscounts()
  }

  delete = id => {
    this.props.deleteTypediscount(id).then(r =>{
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }

  render() {
    const { typediscounts } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Tipos de descuento">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/administration/typediscounts/new" >Nuevo</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable 
                columns={this.columns}
                data={typediscounts}
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

TypeDiscounts.propTypes = {
  fetchTypediscounts: PropTypes.func.isRequired,
  deleteTypediscount: PropTypes.func.isRequired,
  typediscounts: PropTypes.array.isRequired,
}

TypeDiscounts.defaultProps = {
  typediscounts: []
}

const mapStateToProps = state => ({
  typediscounts: getTypediscounts(state)
});

export default connect(mapStateToProps, {
  fetchTypediscounts,
  deleteTypediscount
})(TypeDiscounts);
