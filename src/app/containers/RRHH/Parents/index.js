import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

//components
import DataTable from '../../../shared/components/table/DataTable';
import Modal from '../../../shared/components/Modal';
import CardTitle from '../../../shared/components/CardTitle';

//redux
import { fetchParents } from '../../../redux/actions/parent';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Parents extends Component {
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
            title: 'Dni',
            dataIndex: 'identityNumber',
        },
        {
            title: 'Nombres y Apellidos',
            dataIndex: 'subject.data.fullName',
        },
        {
            title: 'Teléfono',
            dataIndex: 'subject.data.phone',
        },
        {
            title: 'Edad',
            dataIndex: 'subject.data.age',
        },
        {
            title: 'Dirección',
            dataIndex: 'subject.data.address',
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
        if ( this.props.parents.length === 0 ){
            this.props.fetchParents();
        }
    }

    render() {
        const { parents } = this.props;

        return (
            <Row>
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                    <CardTitle title="Apoderados">
                        <ButtonToolbar className="btn-toolbar-top">
                        <Link className="btn btn-primary" to="/rrhh/parents/new">Nuevo</Link>
                        </ButtonToolbar>
                    </CardTitle>
                    <DataTable
                        columns={this.columns}
                        data={parents}
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
Parents.propTypes = {
    fetchParents: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
}

Parents.defaultProps = {
    parents: []
}
const mapStateToProps = state => ({
    parents: state.parent.data,
});
export default connect(mapStateToProps,{
    fetchParents
})(Parents);
