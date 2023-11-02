// Import the Helmet component from the 'react-helmet-async' library, which allows you to manage the document head in React applications.

import { Helmet } from 'react-helmet-async';
import React from 'react';

// Import the React library to create React components.


// Define a functional component called 'Meta' that takes three props: 'title', 'description', and 'keywords'.
const Meta = ({ title, description, keywords }) => {
  // Return JSX to render metadata elements inside the 'Helmet' component.
  return (
    <Helmet>
      {/* Set the title of the web page using the 'title' prop. */}
      <title>{title}</title>

      {/* Define the meta tag for the page description and set its content using the 'description' prop. */}
      <meta name='description' content={description} />

      {/* Define the meta tag for keywords and set its content using the 'keywords' prop. */}
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
}

// Set default prop values for the 'Meta' component. These values will be used when the props are not provided.
Meta.defaultProps = {
  // Default title for the web page.
  title: "Welcome to Steno Market",

  // Default description for the web page. Describes the products and the store.
  description: "Shop the best, latest and cheapest in shoes, clothes, eyeglasses, and necklaces at Steno Market. Find stylish and affordable products for all your fashion needs.",

  // Default keywords for SEO. Keywords relevant to the products and the store.
  keywords: "shoes, clothes, eyeglasses, necklaces, fashion, online store, shop"
}

// Export the 'Meta' component as the default export of this module.
export default Meta;
