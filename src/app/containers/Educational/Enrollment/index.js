import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, Badge, UncontrolledTooltip } from 'reactstrap';
import PrinterIcon from 'mdi-react/PrinterIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import NotificationSystem from 'rc-notification';

// components
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';
import PageLoading from '../../../shared/components/PageLoading';
import CardTitle from '../../../shared/components/CardTitle';

/// redux
import { getEnrollments } from '../../../redux/selectors/enrollment';
import { fetchEnrollments } from '../../../redux/actions/enrollment';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Enrollment extends Component {

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
      title: 'Número de Matricula',
      dataIndex: 'code',
      sort: 'asc'
    },
    {
      title: 'Alumno',
      dataIndex: 'student',
      sort: 'asc'
    },
    {
      title: 'Aula',
      dataIndex: 'classroom',
      sort: 'asc'
    },
    // {
    //   title: 'Apoderado',
    //   dataIndex: 'main',
    //   sort: 'asc',
    // },
    {
      title: 'Acciones',
      sort: 'disabled',
      render: (value, record, index) => (
        <ButtonToolbar>
          <Button className="icon" size="sm" id={`print-${index}`} onClick={ () => this.handlePrint(record.identfier)} ><p><PrinterIcon /> Imprimir</p></Button>
          <UncontrolledTooltip placement="top" target={`print-${index}`}>
            Imprimir
          </UncontrolledTooltip>
        </ButtonToolbar>
      )
    }
  ]

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    if(this.props.enrollments.length === 0){
      this.props.fetchEnrollments();
    }
  }



  render() {
    const {  enrollments } = this.props;
    // const { loading } = this.state;
      return (
          <Row>
            <Col md={12} lg={12}>
              <Card>
                <CardBody>
                  <CardTitle title="Matricula">
                    <ButtonToolbar className="btn-toolbar-top">
                      <Link className="btn btn-primary" to="/educational/enrollment/new"><PencilIcon /> Registrar nueva matricula</Link>
                    </ButtonToolbar>
                  </CardTitle>
                  <DataTable
                    columns={this.columns}
                    data={enrollments}
                  />
                </CardBody>
                {/* {loading && <PageLoading />} */}
              </Card>
            </Col>
          </Row>
      );
  }
}
Enrollment.propTypes = {
  fetchEnrollments: PropTypes.func.isRequired,
  enrollments: PropTypes.array.isRequired,
}

Enrollment.defaultProps = {
  enrollments: []
}

const mapStateToProps = state => ({
    enrollments: getEnrollments(state),
});

export default connect(mapStateToProps,{
    fetchEnrollments,
})(Enrollment);