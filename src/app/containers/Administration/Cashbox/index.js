import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Card, ButtonGroup, CardBody, ButtonToolbar, Button, UncontrolledTooltip } from 'reactstrap';
import PencilOutlineIcon from 'mdi-react/PencilOutlineIcon';

// components
import DataTable from '../../../shared/components/table/DataTable';
import CardTitle from '../../../shared/components/CardTitle';

// redux
import { getCashboxes } from '../../../redux/selectors/cashbox';
import { fetchCashboxes } from '../../../redux/actions/cashbox';

class Cashbox extends Component {
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
            <Link className="btn btn-success" id={`edit-${index}`} to={`/administration/cashbox/${record.identifier}/edit`}><PencilOutlineIcon /> </Link>    
            <UncontrolledTooltip placement="top" target={`edit-${index}`}>
              Editar
            </UncontrolledTooltip>
          </ButtonGroup>
        </ButtonToolbar>
      ),
    },
  ];

  componentDidMount() {
    if ( this.props.cashboxes.length === 0 ){
      this.props.fetchCashboxes();
    }
  }

  render() {
    const { cashboxes } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Cajas">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/administration/cashbox/new">Nuevo</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                columns={this.columns}
                data={cashboxes}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Cashbox.propTypes = {
  fetchCashboxes: PropTypes.func.isRequired,
  cashboxes: PropTypes.array.isRequired,
}

Cashbox.defaultProps = {
  cashboxes: []
}
const mapStateToProps = state => ({
  cashboxes: getCashboxes(state),
});

export default connect(mapStateToProps,{
  fetchCashboxes,
})(Cashbox);
