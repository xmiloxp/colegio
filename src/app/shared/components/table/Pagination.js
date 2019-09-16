import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';

const PaginationComponent = ({pagination , onChangePagination}) => {
  const {total, count, per_page, current_page, total_pages, links} = pagination;
  return (
    <div className="pagination__wrap">

      {!links  ? '' :
        <Pagination className="pagination">
          <PaginationItem className="pagination__item" disabled={current_page === 1}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => onChangePagination(links.previous)}
            >
              <ChevronLeftIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="pagination__item" disabled={current_page === total_pages}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => onChangePagination(links.next)}
            >
              <ChevronRightIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      }
      <div className="pagination-info">
        <span>Mostrando de {`${per_page * (current_page - 1) + 1} `}
         a {per_page * current_page > total ? total
          : per_page * current_page} de {total}</span>
      </div>
    </div>
  );
};

export default PaginationComponent;