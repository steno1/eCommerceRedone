// Import necessary modules

import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer from 'react-router-bootstrap' library
import { Pagination } from 'react-bootstrap'; // Import Pagination from 'react-bootstrap' library
import React from 'react'; // Import React, the core library for building user interfaces

// Create a React functional component called Paginate
const Paginate = ({ pages, page, isAdmin = false, keyword=''}) => {
  // This component takes three props: pages, page, and isAdmin. isAdmin is optional and defaults to false.
  // These props are passed in when you use this component in your application.

  return (
    // This is the start of the component's rendering logic. It will only render if there are more than one page (pages > 1).
    pages > 1 && (
      <Pagination>
        {/* Render a Pagination component from the 'react-bootstrap' library. */}
        {[...Array(pages).keys()].map((x) => (
          // Create an array of page numbers and map over it to generate pagination items.
          <LinkContainer key={x + 1} to={!isAdmin ?keyword?`/search/${keyword}/page/${x+1}`: `/page/${x + 1}` : `/admin/productlist/${x + 1}`}>
            {/* Use LinkContainer to create links that work with React Router.
            The 'to' prop specifies the link's destination.
            If isAdmin is false, it links to /page/x+1; otherwise, it links to /admin/productlist/x+1. */}
            <Pagination.Item active={x + 1 === page}>
              {/* Render a pagination item for each page number.
              The 'active' prop is used to highlight the current page. */}
              {x + 1}
              {/* Display the page number. */}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

// Export the Paginate component as the default export of this module
export default Paginate;
