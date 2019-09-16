import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import DataTableHead from './DataTableHead';
import DataTableBody from './DataTableBody';

const DataTableTable = (props) => {
  const { 
    autoWidth,
    btn,
    columns,
    hover,
    small,
    responsive,
    handleSort,
    sortable,
    rows
  } = props;
  return (
    <Table responsive hover className="table--bordered">
      <DataTableHead
        columns={columns}
        handleSort={handleSort}
        sortable
      />
      <DataTableBody
        columns={columns}
        rows={rows}
      />
    </Table>
  );
};

DataTableTable.propTypes = {
  
};

export default DataTableTable;