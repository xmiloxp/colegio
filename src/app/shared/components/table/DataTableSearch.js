import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';


const DataTableSearch = ({handleSearchChange, search, searching}) => {
  return (
    <Col md={6} sm={12}>
      {
        searching &&
        <div className="dataTables_filter">
          <label>Buscar:
            <input 
              value={search}
              onChange={handleSearchChange}
              type='search'
              placeholder='Buscar'
            />
          </label>

        </div>
      }
    </Col>
  );
};

DataTableSearch.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searching:PropTypes.bool.isRequired,
}
export default DataTableSearch;