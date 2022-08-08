/**
 * @author Alek Michael
 */
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";
import { useState } from "react";
import { useEffect } from "react";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  /**
   * The first thing I changed was making these into states.
   * This allows easier writing for me in the child components.
   */
  // Current Page Index
  const [currentPage, setCurrentPage] = useState(1);
  // Maximum items per page
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(15);
  // The actual user information to be displayed, calculated in useEffect below
  const [currentPaginationData, setCurrentPaginationData] = useState([]);
  // Anytime the page or page size change, we'll have to "re-fetch" the user data
  useEffect(() => {
    // if in bounds, get the full slice
    if (currentPage * currentRowsPerPage <= blogs.posts.length)
      setCurrentPaginationData(
        blogs.posts.slice(
          (currentPage - 1) * currentRowsPerPage,
          currentPage * currentRowsPerPage
        )
      );
    // otherwise, just get the rest
    else
      setCurrentPaginationData(
        blogs.posts.slice(
          (currentPage - 1) * currentRowsPerPage,
          blogs.posts.length
        )
      );
  }, [currentPage, currentRowsPerPage]);

  // functions to be passed down to Pagination component, changes the state here
  const updateRowsPerPage = (rows) => setCurrentRowsPerPage(rows);
  const updatePage = (page) => setCurrentPage(page);

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={currentRowsPerPage}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
