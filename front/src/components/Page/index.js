import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./page.css";

const Page = ({ totalPage: totalPageSize, pageCallbackFn, groupCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setTotalPage(totalPageSize);
  }, [totalPageSize]);

  const handlePageClick = (currentPage) => {
    if (currentPage >= groupCount) {
      const newStartPage = currentPage - 2;
      setStartPage(newStartPage);
    }
    if (currentPage < groupCount) {
      setStartPage(1);
    }
    if (currentPage === 1) {
      setStartPage(1);
    }
    setCurrentPage(currentPage);
    pageCallbackFn(currentPage);
  };

  const handlePrePageClick = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage === 0) {
      return false;
    }
    handlePageClick(newCurrentPage);
  };

  const handleNextPageClick = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage > totalPage) {
      return false;
    }
    handlePageClick(newCurrentPage);
  };

  const renderPageList = () => {
    let pages = [];
    pages.push(
      <li
        className={currentPage === 1 ? "nomore" : null}
        onClick={handlePrePageClick}
        key={0}
      >
        previous
      </li>
    );

    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "activePage" : null}
          >
            {i}
          </li>
        );
      }
    } else {
      pages.push(
        <li
          className={currentPage === 1 ? "activePage" : null}
          key={1}
          onClick={() => handlePageClick(1)}
        >
          1
        </li>
      );

      let pageLength = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage;
      } else {
        pageLength = groupCount + startPage;
      }
      if (currentPage >= groupCount) {
        pages.push(<li key={-1}>···</li>);
      }
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(
            <li
              className={currentPage === i ? "activePage" : null}
              key={i}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </li>
          );
        }
      }
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li key={-2}>···</li>);
      }
      pages.push(
        <li
          className={currentPage === totalPage ? "activePage" : null}
          key={totalPage}
          onClick={() => handlePageClick(totalPage)}
        >
          {totalPage}
        </li>
      );
    }
    pages.push(
      <li
        className={currentPage === totalPage ? "nomore" : null}
        onClick={handleNextPageClick}
        key={totalPage + 1}
      >
        next
      </li>
    );
    return pages;
  };

  return <ul className="pageContainer">{renderPageList()}</ul>;
};

Page.propTypes = {
  totalPage: PropTypes.number,
  pageCallbackFn: PropTypes.func,
  groupCount: PropTypes.number,
};

Page.defaultProps = {
  totalPage: 1,
  pageCallbackFn: () => {},
  groupCount: 5,
};

export default Page;
