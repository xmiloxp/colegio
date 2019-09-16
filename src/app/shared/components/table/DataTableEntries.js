import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

const DataTableEntries = ({handleEntriesChange, paging, displayEntries, entriesArr, entries}) => {
  const getValue = e  => {
    let value = parseInt(e.target.value, 10);
    handleEntriesChange(value);
  }
  return (
    <Col md={6} sm={12}>
      {
        paging && displayEntries && 
        <div className='dataTables_length bs-select'>
          <label>
            Ver 
            <select className="select-options" value={entries} onChange={getValue}>
              {
                entriesArr.map(entry => <option key={entry} value={entry}>{entry}</option>)
              }
            </select>
          </label>
        </div>
      }
    </Col>
  );
};

DataTableEntries.propTypes = {
  handleEntriesChange: PropTypes.func.isRequired,
  displayEntries: PropTypes.bool.isRequired,
  entriesArr: PropTypes.arrayOf(PropTypes.number).isRequired,
  paging: PropTypes.bool.isRequired,
  entries: PropTypes.number.isRequired,
}
export default DataTableEntries;