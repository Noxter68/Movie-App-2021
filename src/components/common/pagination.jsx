import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <a
          href=""
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
          key={page}
        >
          {page}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
