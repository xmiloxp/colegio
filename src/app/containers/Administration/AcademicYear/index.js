import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, Badge, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';
import moment from 'moment';

//components
import CardTitle from '../../../shared/components/CardTitle';
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';

//redux
import { getAcademicyears } from '../../../redux/selectors/academicyear';
import { fetchAcademicYears, deleteAcademicYear, changeStateAcademicYear } from '../../../redux/actions/academicYear';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

// const
import { STATE_ACTIVO, STATE_INACTIVO } from '../../../Constants';

let notification;
class AcademicYear extends Component {
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
          title: 'Año',
          dataIndex: 'name',
        },
        {
          title: 'Fecha inicio',
          dataIndex: 'initdate',
          render: value => moment(value).format('DD/MM/YYYY')
        },
        {
          title: 'Fecha final',
          dataIndex: 'enddate',
          render: value => moment(value).format('DD/MM/YYYY')
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            render: (value, record) => <a onClick={() => this.handleChangeState(record.identifier, value)}><Badge  color={ value === STATE_INACTIVO ? 'danger': value === STATE_ACTIVO? 'success': 'primary' }>{ value === STATE_INACTIVO ? 'Inactivo': value === STATE_ACTIVO ? 'Activo': 'Cerrado'}</Badge></a>
        },
        {
          title: 'Acciones',
          render: (value, record, index) => (
            <ButtonToolbar>
                <ButtonGroup className="btn-group--icons">
                {
                    (record.state === STATE_INACTIVO) &&
                    <Fragment>
                        <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/academicyears/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
                        <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                            Editar
                        </UncontrolledTooltip>
                        <Button color="danger" id={`delete-${index}`} onClick={() => this.setState({show:true, identifier: record.identifier})}>
                            <DeleteForeverIcon />
                        </Button>
                        <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                            Eliminar
                        </UncontrolledTooltip>
                    </Fragment>
                }
                </ButtonGroup>
            </ButtonToolbar>
          ),
        },
    ];
    componentDidMount() {
        NotificationSystem.newInstance({}, n => notification = n);
        if (this.props.academicyears.length === 0) {
            this.props.fetchAcademicYears();
        }
    }

    delete = id => {
        this.props.deleteAcademicYear(id).then(r =>{
            notificationSuccess(notification);
        }).catch(r => {
            notificationError(notification, r);
        });
    }
    handleChangeState = (id, state) => {
        this.props.changeStateAcademicYear(id).then(r =>{
            notificationSuccess(notification);
        }).catch(r => {
            notificationError(notification, r);
        });
    }
    render() {
        const { academicyears } = this.props;
        // console.log(academicyears);
        return (
            <Row>
                <Col md={12} lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle title="Año academico">
                                <ButtonToolbar className="btn-toolbar-top">
                                    <Link className="btn btn-primary" to="/administration/academicyears/new">Nuevo</Link>
                                </ButtonToolbar>
                            </CardTitle>
                            <DataTable
                                data={academicyears}
                                columns={this.columns}
                            />
                        </CardBody>
                    </Card>
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
                </Col>
            </Row>
        );
    }
}
AcademicYear.propTypes = {
    fetchAcademicYears: PropTypes.func.isRequired,
    academicyears: PropTypes.array.isRequired,
    changeStateAcademicYear: PropTypes.func.isRequired,
    deleteAcademicYear: PropTypes.func.isRequired,
}

AcademicYear.defaultProps = {
    academicyears: []
}
const mapStateToPros = state => ({
    academicyears: getAcademicyears(state)
})
export default connect(mapStateToPros,{
    fetchAcademicYears,
    deleteAcademicYear,
    changeStateAcademicYear
})(AcademicYear);