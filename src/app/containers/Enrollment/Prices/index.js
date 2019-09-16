import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';
import NotificationSystem from 'rc-notification';

// components
import DataTable from '../../../shared/components/table/DataTable';
import Modal from '../../../shared/components/Modal';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { fetchConceptsEnrollment } from '../../../redux/actions/concept';

// utils
import { notificationSuccess, notificationError } from '../../../utils/utils';

let notification;
class Prices extends Component {
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
      render: (vale, record, index) => index + 1
    },
    {
      title: 'Descripción',
      dataIndex: 'name'
    },
    {
      title: 'Precio',
      dataIndex: 'price'
    },
    {
      title: 'Acciones',
      sort: 'disabled',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
            <Fragment>
              <Button color="primary" id={`new-price-${index}`} onClick={() => this.setState({show:true, identifier: record.identifier})}>
                <DeleteForeverIcon />
              </Button>
              <UncontrolledTooltip placement="top" target={`new-price-${index}`}>
                Nuevo precio
              </UncontrolledTooltip>
            </Fragment>
          </ButtonGroup>
        </ButtonToolbar>
      ),
    },
  ]

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    this.props.fetchConceptsEnrollment();
  }
  

  render() {
    const { concepts } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Precios">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/enrollment/prices/new">Nuevo precio</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                columns={this.columns}
                data={concepts}
              />
            </CardBody>
          </Card>
        </Col>

      </Row>
    );
  }
}

Prices.propTypes = {
  fetchConceptsEnrollment: PropTypes.func.isRequired,
};

Prices.defaultProps = {
  concepts: []
}

const mapStateToProps = state => ({
  concepts: state.conceptEnrollment.data
})

export default connect(mapStateToProps, {
  fetchConceptsEnrollment
})(Prices);