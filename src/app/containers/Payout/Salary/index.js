import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardBody, ButtonToolbar } from 'reactstrap';
import PencilIcon from 'mdi-react/PencilIcon';
import PrinterIcon from 'mdi-react/PrinterIcon';

// components
import DataTable from '../../../shared/components/table/DataTable';
import CardTitle from '../../../shared/components/CardTitle';

class Salary extends Component {
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
              <CardTitle title="Ingreso por matricula">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/payout/salary/new"><PencilIcon /> Nueva matricula</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                columns={this.columns}
                data={charge}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Salary.propTypes = {

};

export default Salary;