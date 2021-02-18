import React from "react";
import Card from "./common/card";
import Pagination from "./common/pagination";
import Loader from "./common/loader";

const ListMovie = ({
  movies,
  loader,
  path,
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  pathLink,
  title,
}) => {
  return (
    <React.Fragment>
      <div className="popular-title">
        <h2 className="">{title}</h2>
      </div>
      <div className="container-card">
        {loader ? (
          movies.map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              pathPoster={path}
              pathLink={pathLink}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
      <Pagination
        itemsCount={itemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </React.Fragment>
  );
};

export default ListMovie;
