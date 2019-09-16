import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

// components
import CardTitle from '../../../shared/components/CardTitle';
import Modal from '../../../shared/components/Modal';
import DataTable from '../../../shared/components/table/DataTable';

// redux
import { fetchConcepts } from '../../../redux/actions/product';
import { getConcepts } from '../../../redux/selectors/concept';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Concepts extends Component {
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
          title: 'Concepto',
          dataIndex: 'name',
        },
        {
          title: 'Costo',
          dataIndex: 'price',
        },
        {
          title: 'Acciones',
          render: (value, record, index) => (
            <ButtonToolbar>
                <ButtonGroup className="btn-group--icons">
                    <Fragment>
                        <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/concepts/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
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
        if (this.props.concepts.length === 0) {
            this.props.fetchConcepts();
        }
    }

    delete = id => {
        this.props.deleteConcept(id).then(r =>{
            notificationSuccess(notification);
        }).catch(r => {
            notificationError(notification, r);
        });
    }
    render() {
        const { concepts } = this.props;
        return (
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <CardTitle title="Conceptos">
                                <ButtonToolbar className="btn-toolbar-top">
                                    <Link className="btn btn-primary" to="/administration/concepts/new">Nuevo</Link>
                                </ButtonToolbar>
                            </CardTitle>
                            <DataTable
                                data={concepts}
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

Concepts.propTypes = {
    fetchConcepts: PropTypes.func.isRequired,
    concepts: PropTypes.array.isRequired,
}
Concepts.defaultProps = {
    concepts: []
}

const mapStateToPros = state => ({
    concepts: getConcepts(state)
})

export default connect(mapStateToPros,{
    fetchConcepts
})(Concepts);





