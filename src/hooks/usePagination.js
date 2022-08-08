/**
 * @author Alek Michael
 */
import PropTypes from "prop-types";

export const DOTS = "...";

function usePagination({ currentPage, totalCount, totalPages, pageSize }) {
  /*
   * The usePagination hook returns the pagination range based off the current page and how many pages are available.
   */

  // guards for if the size is consistent no matter the current page
  if (totalPages == 1) return [1];
  if (totalPages == 2) return [1, 2];
  if (totalPages == 3) return [1, 2, 3];

  // every range begins with the first page
  let range = [1];

  // get siblings (within range)

  let curr;
  // if the current page is the first or second page
  if (currentPage < 3) {
    curr = 2;
    // get siblings (within total page range)
    while (range.length < totalPages && range.length < 3) range.push(curr++);
    // add ellipses
    range.push(DOTS);
  }
  // if the current page is no near the beginning or end
  else if (currentPage > totalPages - 2) {
    curr = totalPages - 2;
    // add ellipses
    range.push(DOTS);
    // get siblings (within total page range)
    while (range.length < totalPages && range.length < 4) range.push(curr++);
  }
  // if the current page is near the end
  else {
    curr = currentPage - 1;
    // add ellipses
    range.push(DOTS);
    // get siblings (within total page range)
    while (range.length < totalPages && range.length < 5) range.push(curr++);
    // add ellipses
    range.push(DOTS);
  }

  // attach last page
  range.push(totalPages);

  return range;
}

usePagination.PropTypes = {
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number,
  pageSize: PropTypes.number,
};

export default usePagination;
