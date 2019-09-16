import React from 'react';
import PropTypes from 'prop-types';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import MenuDownIcon from 'mdi-react/MenuDownIcon';

const DataTableHead = ({columns, handleSort, sortable}) => {
  return (
    <thead>
      <tr>
        {
          columns.map((col, index) => 
            <th 
              key={index}
              onClick={function onClick() { return sortable && handleSort(col.dataIndex, col.sort)}}
            >
              {col.title}
              {sortable && col.sort !== 'disabled' && col.sort === 'asc' ? <MenuUpIcon className="float-right" /> : <MenuDownIcon className='float-right' />}
            </th>)
        }
      </tr>
    </thead>
  );
};

DataTableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  handleSort: PropTypes.func,
  sortable: PropTypes.bool,
};

DataTableHead.defaultProps = {
  sortable: true
}
export default DataTableHead;