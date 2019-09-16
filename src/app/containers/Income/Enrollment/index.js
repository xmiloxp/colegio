import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody, ButtonToolbar } from 'reactstrap';
import PencilIcon from 'mdi-react/PencilIcon';
import PrinterIcon from 'mdi-react/PrinterIcon';

// components
import CardTitle from '../../../shared/components/CardTitle';
import DataTable from '../../../shared/components/table/DataTable';


class Enrollment extends Component {
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
    const { enrollments } = this.props;
    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <CardTitle title="Ingreso por matricula">
                <ButtonToolbar className="btn-toolbar-top">
                  <Link className="btn btn-primary" to="/income/enrollment/new"><PencilIcon /> Nueva matricula</Link>
                </ButtonToolbar>
              </CardTitle>
              <DataTable
                columns={this.columns}
                data={enrollments}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Enrollment.propTypes = {
  enrollments: PropTypes.array.isRequired,
};

Enrollment.defaultProps = {
  enrollments: []
}

export default Enrollment;