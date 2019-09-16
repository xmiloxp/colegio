import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

//components
import DataTable from '../../../shared/components/table/DataTable';
import Modal from '../../../shared/components/Modal';

//redux
import { getGrades } from '../../../redux/selectors/grade';
import { fetchGrades, deleteGrade } from '../../../redux/actions/grade';

//utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Grades extends Component {
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
              <Link className="btn btn-success" id={`edit-${index}`} to={`/enrollment/grades/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
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
    if ( this.props.grades.length === 0) {
      this.props.fetchGrades();
    }
  }

  delete = id => {
    this.props.deleteGrade(id).then(r => {
      notificationSuccess(notification);
    }).catch(r => {
      notificationError(notification, r);
    });
  }
  
  render() {
    const { grades } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <div className="card__title">
                <h5 className="bold-text">Grados</h5>
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/enrollment/grades/new">Nuevo</Link>
                </ButtonToolbar>
              </div>
              <DataTable
                columns={this.columns}
                data={grades}
              />
            </CardBody> 
          </Card>
        </Col>
        <Modal
          show={this.state.show}
          title="Advertencia"
          color="danger"
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

Grades.propTypes = {
  fetchGrades: PropTypes.func.isRequired,
  deleteGrade: PropTypes.func.isRequired,
  grades: PropTypes.array.isRequired,
}

Grades.defaultProps = {
  grades: []
}
const mapStateToProps = state => ({
  grades: getGrades(state),
});

export default connect(mapStateToProps,{
  fetchGrades,
  deleteGrade
})(Grades);
