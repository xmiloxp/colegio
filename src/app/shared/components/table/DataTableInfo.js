import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

const DataTableInfo = (props) => {
  const {activePage, entries, filteredRows, info, pages} = props;
  return (
    <Col md={5} sm={12}>
      {info &&
        <div className="pagination-info dataTables_info" role="status">
          {`Mostrando de ${filteredRows.length === 0 ? filteredRows.length : activePage * entries + 1} a ${pages.length - 1 > activePage ? pages[activePage].length * (activePage + 1) : filteredRows.length} de ${filteredRows.length}`}
        </div>
      }
    </Col>
  );
};

DataTableInfo.propTypes = {
  activePage: PropTypes.number.isRequired,
  entries: PropTypes.number.isRequired,
  filteredRows: PropTypes.array.isRequired,
  info: PropTypes.bool.isRequired,
  pages: PropTypes.array.isRequired,
};

export default DataTableInfo;