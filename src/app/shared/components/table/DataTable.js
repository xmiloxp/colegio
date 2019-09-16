import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import DataTableEntries from './DataTableEntries';
import DataTableSearch from './DataTableSearch';
import DataTableInfo from './DataTableInfo';
import DataTablePagination from './DataTablePagination';
import DataTableTable from './DataTableTable';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activePage : 0,
      columns: props.columns || [],
      entries: props.entries,
      filteredRows: props.data || [],
      pages: [],
      pagesTotal: 0,
      rows: props.data || [],
      search: '',
      order: props.order || []
    };
    if (this.props.paging) {
      this.paginateRowsInitialy();
    } else {
      this.state.pages.push(this.state.rows);
    }
  }

  componentDidMount() {
    console.log('cdm');

    this.state.order.length && this.handleSort(this.state.order[0], this.state.order[1]);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        columns: this.props.columns || [],
        filteredRows: this.props.data || [],
        rows: this.props.data || []
      });
    }

    if(prevState.pages !== this.state.pages || prevState.rows !== this.state.rows) {
      console.log('cdu');
      this.paginateRows();
    }
  }
  
  paginateRowsInitialy = () => {
    console.log('pri');

    const pagesAmount = Math.ceil(this.state.rows.length / this.state.entries);
    for (let i = 1; i <= pagesAmount; i++) {
      const pageEndIndex = i * this.state.entries;
      this.state.pages.push(this.state.rows.slice(pageEndIndex - this.state.entries, pageEndIndex));
    }
  }

  handleEntriesChange = (value) => {
    console.log('hec');
    this.setState({
      entries: Array.isArray(value) ? value[0] : value
    }, () => this.paginateRows());
  }

  handleSearchChange = (e) => {
    console.log('hsc');

    this.setState({
      search: e.target.value
    }, () => this.filterRows());
  }

  handleSort = (field, sort) => {
    console.log('hs');

    if (sort !== "disabled") {
      this.setState((prevState) => {
        switch (sort) {
          case "desc":
            prevState.rows.sort((a,b) => a[field] > b[field] ? -1 : 1);
            break;
          
          default:
            prevState.rows.sort((a,b) => a[field] > b[field] ? 1 : -1);
        }

        prevState.columns[prevState.columns.findIndex(column => column.dataIndex === field)].sort = sort === "asc" ? "desc" : "asc";
        return {
          rows: prevState.rows,
          columns: prevState.columns
        }
      }, () => this.filterRows())
    } else return;
  }

  filterRows = () => {
    console.log('fr');

    this.setState((prevState) => {
      let filteredRows = prevState.rows.filter((row) => {
        for(let key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            let stringValue = row[key] !== null ? row[key].toString() : '';
            if (stringValue.toLowerCase().match(this.state.search.toLowerCase())) return true;
          }
        }
        return false;
      });
      // if (filteredRows.length === 0) filteredRows.push({
      //   message: 'No se encontraron coincidencias',
      //   colspan: prevState.columns.length
      // });
      return {
        filteredRows: filteredRows,
        activePage: 0
      }
    }, () => this.paginateRows())
  }

  paginateRows = () => {
    console.log('pr');

    const pagesAmount = Math.ceil(this.state.filteredRows.length / this.state.entries);
    this.setState((prevState) => {
      prevState.pages = [];

      if (this.props.paging) {

        for (let i = 1; i <= pagesAmount; i++) {
          const pageEndIndex = i * prevState.entries;
          prevState.pages.push(prevState.filteredRows.slice(pageEndIndex - prevState.entries, pageEndIndex));
        }
        prevState.pagesTotal = pagesAmount;
        prevState.activePage = prevState.activePage < prevState.pages.length || prevState.activePage === 0 ? prevState.activePage : prevState.pages.length - 1;
      } else {
        prevState.pages.push(prevState.filteredRows);
        prevState.activePage = 0;
        prevState.pagesTotal = 0;
      }
      return {
        page: prevState.pages,
        activePage: prevState.activePage,
        pagesTotal: prevState.pagesTotal
      }
    })
  }

  changeActivePage = (page) => {
    console.log('cap');

    this.setState({
      activePage: page
    }, () => this.paginateRows())
  }
  render() {

    const {
      displayEntries,
      entriesOptions,
      exportToCSV,
      info,
      order,
      pagesAmount,
      paging,
      responsive,
      searching,
      sortable,
      small
    } = this.props;

    const {
      columns,
      entries,
      filteredRows,
      pages,
      activePage,
      search,
      pagesTotal
    } = this.state;
    return (
      <div className="dataTables_wrapper">
        <Row>
          <DataTableEntries
            paging={paging}
            displayEntries={displayEntries}
            entries={entries}
            handleEntriesChange={this.handleEntriesChange}
            entriesArr={entriesOptions}
          />
          <DataTableSearch 
            handleSearchChange={this.handleSearchChange}
            search={search}
            searching={searching}
          />
        </Row>
        <DataTableTable
          columns={columns}
          handleSort={this.handleSort}
          rows={pages[activePage]}
        />
        <Row>
          <DataTableInfo
            activePage={activePage}
            entries={entries}
            filteredRows={filteredRows}
            info={info}
            pages={pages}
          />
          <DataTablePagination
            activePage={activePage}
            changeActivePage={this.changeActivePage}
            pages={pages}
            pagesAmount={pagesAmount}
            pagesTotal={pagesTotal}
          />
        </Row>
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  displayEntries: PropTypes.bool,
  entries: PropTypes.number,
  entriesOptions: PropTypes.arrayOf(PropTypes.number),
  exportToCSV: PropTypes.bool,
  info: PropTypes.bool,
  order: PropTypes.arrayOf(PropTypes.string),
  pagesAmount: PropTypes.number,
  paging: PropTypes.bool,
  responsive: PropTypes.bool,
  searching: PropTypes.bool,
  sortable: PropTypes.bool,
  small: PropTypes.bool,
};

DataTable.defaultProps = {
  columns: {},
  data: [],
  displayEntries: true,
  entries: 10,
  entriesOptions: [10, 20, 30, 40],
  exportToCSV: false,
  info: true,
  order: [],
  pagesAmount: 8,
  paging: true,
  responsive: false,
  searching: true,
  sortable: true,
};

export default DataTable;