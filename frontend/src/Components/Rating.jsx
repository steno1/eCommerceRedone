import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"; // Importing necessary icons from the react-icons/fa package

import React from 'react'; // Importing the React module from the 'react' package

const Rating = ({ value, text }) => { // Declaring a functional component named Rating that takes two props: value and text
  return (
    <div className="rating"> {/* Opening a div element with a class of "rating" */}
      <span>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {/* Rendering a span element with an inline conditional statement:
        If value is greater than or equal to 1, render a filled star icon.
        Else if value is greater than or equal to 0.5, render a half-filled star icon.
        Else, render an outline star icon.
      */}
      <span>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {/* Similar logic as above for the second star */}
      <span>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {/* Similar logic as above for the third star */}
      <span>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {/* Similar logic as above for the fourth star */}
      <span>{value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      {/* Similar logic as above for the fifth star */}
      <span className="rating text">{text ? text : null}</span>
      {/* Rendering a span element with a class of "rating text":
        If text prop is provided, render the text. Otherwise, render null.
      */}
    </div>
  );
};

export default Rating; // Exporting the Rating component as the default export of this module
