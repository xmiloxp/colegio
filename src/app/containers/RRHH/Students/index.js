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
import { fetchStudents } from '../../../redux/actions/student';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      identifier: ''
    };
  }  
    columns = [
        {
            title: 'Dni',
            dataIndex: 'identityNumber',
        },
        {
          title: 'Alumno',
          dataIndex: 'subject.data.fullName',
        },
        {
          title: 'Edad',
          dataIndex: 'subject.data.age',
        },
        {
          title: 'Dirección',
          dataIndex: 'subject.data.address',
        },
      //   {
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
      if ( this.props.students.length === 0 ){
          this.props.fetchStudents();
      }
    }
    

    render() {
        const { students } = this.props;
        return (
          <Row>
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                    <CardTitle title="Madres">
                        <ButtonToolbar className="btn-toolbar-top">
                        <Link className="btn btn-primary" to="/rrhh/students/new">Nuevo</Link>
                        </ButtonToolbar>
                    </CardTitle>
                    <DataTable
                        columns={this.columns}
                        data={students}
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
Students.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
}

Students.defaultProps = {
  students: []
}
const mapStateToProps = state => ({
    students: state.student.data,
});
export default connect(mapStateToProps,{
    fetchStudents,
})(Students);