import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationSystem from 'rc-notification';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';

// components
import CardTitle from '../../../shared/components/CardTitle';
import DataTable from '../../../shared/components/table/DataTable';
import Modal from '../../../shared/components/Modal';

// redux
import { getDiscounts } from '../../../redux/selectors/discount';
import { fetchDiscounts, deleteDiscount } from '../../../redux/actions/discount';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Discounts extends Component {
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
      title: 'Tipo',
      dataIndex: 'promotiontype'
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
              <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/discounts/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
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
    if(this.props.discounts.length === 0) this.props.fetchDiscounts()
  }
    
  delete = id => {
    this.props.deleteDiscount(id).then(r =>{
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }  

  render() {
    const { discounts } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle title="Descuentos">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/administration/discounts/new" >Nuevo</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable 
                columns={this.columns}
                data={discounts}
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

Discounts.propTypes = {
  fetchDiscounts: PropTypes.func.isRequired,
  deleteDiscount: PropTypes.func.isRequired,
  discounts: PropTypes.array.isRequired,
}

Discounts.defaultProps = {
  discounts: []
}

const mapStateToPros = state => ({
    discounts: getDiscounts(state)
})
export default connect(mapStateToPros,{
    fetchDiscounts,
    deleteDiscount
})(Discounts);
