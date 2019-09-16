import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';


class DataTablePagination extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pages: props.pages,
      pGroups: []
    };
  }

  componentDidMount() {
    this.groupPages();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.pages !== this.props.pages){
      this.setState({
        pages: this.props.pages
      }, () => this.groupPages()
      );
    }
  }
  

  groupPages = () => {
    const pGroups = [];
    const pages = this.state.pages;
    
    while (pages.length > 0) {
      pGroups.push(pages.splice(0,this.props.pagesAmount));
    }
    this.setState({
      pGroups: pGroups
    });
  }

  choosePagesGroup = () => {
    const pGroupNumber = Math.floor(this.props.activePage / this.props.pagesAmount);
    return this.state.pGroups.length ? this.state.pGroups[pGroupNumber] : [];
  }

  render() {

    const { activePage, changeActivePage, pagesTotal } = this.props;
    return (
      <Col md={5} sm={12}>
        <Pagination className="dataTables_paginate">
          <PaginationItem 
            className="pagination__item" 
            disabled={activePage === 0}
          >
            <PaginationLink 
              className="pagination_link pagination_link-arrow"
              onClick={function onClick() { changeActivePage(activePage - 1)} }
            >
              <ChevronLeftIcon className="pagination__link-icon"/>
            </PaginationLink>
          </PaginationItem>
          {this.choosePagesGroup().map((page, index) => 
            (<PaginationItem 
              className="pagination_item" 
              key={index} 
              active={index === activePage}
            >
              <PaginationLink 
                className="pagination_link pagination_link-arrow"
                onClick={function onClick() {changeActivePage(index)}}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>))}
          <PaginationItem 
            className="pagination__item" 
            disabled={ activePage === pagesTotal - 1}
          >
            <PaginationLink 
              className="pagination_link pagination_link-arrow"
              onClick={function onClick() {changeActivePage(activePage + 1)}}
            >
              <ChevronRightIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Col>
    );
  }
}

DataTablePagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  pagesAmount: PropTypes.number.isRequired,
  pagesTotal: PropTypes.number.isRequired,
};

export default DataTablePagination;