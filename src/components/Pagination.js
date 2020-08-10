import React from "react";

export const Pagination = (props) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.articles.length / props.postsPerPage);
    ++i
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li
            className="page-item"
            key={number}
            onClick={() => props.paginate(number)}
          >
            <div className={`page-link`}>{number}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
