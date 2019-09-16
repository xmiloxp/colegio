import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardBody, ButtonToolbar } from 'reactstrap';
import CardTitle from '../../../shared/components/CardTitle';
import PencilIcon from 'mdi-react/PencilIcon';
import DataTable from '../../../shared/components/table/DataTable';
import PrinterIcon from 'mdi-react/PrinterIcon';

class MonthlyPayment extends Component {
  columns = [
    {
      title: 'N°',
      render: (value, record, index) => index + 1
    },
    {
      title: 'Comprobante',
      dataIndex: 'name',
      sort: 'asc'
    },
    {
      title: 'Acciones',
      sort: 'disabled',
      render: (value, record, index) => (
        <ButtonToolbar>
          <ButtonGroup className="btn-group--icons">
              <Button className="icon" id={`print-${index}`} onClick={ () => this.handlePrint(record.identfier)} ><p><PrinterIcon /> Imprimir</p></Button>
              <UncontrolledTooltip placement="top" target={`print-${index}`}>
                    Imprimir
              </UncontrolledTooltip>
           </ButtonGroup>
        </ButtonToolbar>
      )
    }  
  ]
  render() {
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Cobro de pension">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/income/monthlypayment/new"><PencilIcon /> Nueva matricula</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                columns={this.columns}
                data={monthlypayments}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

MonthlyPayment.propTypes = {
  monthlypayments: PropTypes.array.isRequired,
};

MonthlyPayment.defaultProps = {
  monthlypayments: []
}

export default MonthlyPayment;