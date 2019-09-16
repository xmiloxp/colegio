import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

//components
import CardTitle from '../../../shared/components/CardTitle';
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';

//redux
import { fetchEmployees } from '../../../redux/actions/employee';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Employees extends Component {
    constructor (props) {
        super(props);
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
            dataIndex: 'subjectTypeName',
        },
        {
            title: 'Dni',
            dataIndex: 'identityNumber',
        },
        {
          title: 'Trabajador',
          dataIndex: 'fullName',
        },

        {
            title: 'Dirección',
            dataIndex: 'address',
        },
        {
            title: 'Modalidad de pago',
            dataIndex: 'payMode',
        },
        {
            title: 'Documento de Pago',
            dataIndex: 'payVoucher'
        },
        {
            title: 'Sueldo',
            dataIndex: 'salary',
        },
        // {
        //     title: 'Acciones',
        //     sort: 'disabled',
        //     render: (value, record, index) => (
        //       <ButtonToolbar>
        //         <ButtonGroup className="btn-group--icons">
        //           <Fragment>
        //             <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/levels/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
        //             <UncontrolledTooltip placement="top" target={`edit-${index}`}>
        //               Editar
        //             </UncontrolledTooltip>
        //           </Fragment>
        //           <Fragment>
        //             <Button color="danger" id={`delete-${index}`} onClick={() => this.setState({show:true, identifier: record.identifier})}>
        //               <DeleteForeverIcon />
        //             </Button>
        //             <UncontrolledTooltip placement="top" target={`delete-${index}`}>
        //               Eliminar
        //             </UncontrolledTooltip>
        //           </Fragment>
        //         </ButtonGroup>
        //       </ButtonToolbar>
        //     ),
        // }
    ];
    componentDidMount() {
        NotificationSystem.newInstance({}, n => notification = n);
        if ( this.props.employees.length === 0 ){
            this.props.fetchEmployees();
        }
    }

    render() {
        const {  employees } = this.props;
        return (
            <Row>
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                    <CardTitle title="Empleados">
                        <ButtonToolbar className="btn-toolbar-top">
                        <Link className="btn btn-primary" to="/rrhh/employees/new">Nuevo</Link>
                        </ButtonToolbar>
                    </CardTitle>
                    <DataTable
                        columns={this.columns}
                        data={employees}
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


Employees.propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
}

Employees.defaultProps = {
    employees: []
}
const mapStateToProps = state => ({
    employees: state.employee.data,
});
export default connect(mapStateToProps,{
    fetchEmployees,
})(Employees);