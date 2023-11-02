import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import React from 'react'
import { useState } from 'react'

// Import necessary components, hooks, and libraries from their respective packages.

const SearchBox = () => {
    // Define a functional component called SearchBox.
    const navigate = useNavigate(); // Hook for programmatic navigation.
    const { keyword: urlKeyword } = useParams(); // Hook to access URL parameters.
    const [keyword, setKeyword] = useState(urlKeyword || ""); // State variable for the search keyword.

    // Define a function to handle the form submission.
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        if (keyword.trim()) {
            // If the keyword is not empty or only consists of whitespace characters.
            setKeyword(""); // Clear the keyword input field.
            navigate(`/search/${keyword}`); // Navigate to the search results page with the keyword.
        } else {
            navigate("/"); // If the keyword is empty or only consists of whitespace characters, navigate to the home page.
        }
    }

    // Return the JSX (UI) of the SearchBox component.
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            {/* Create a form element with an onSubmit event handler. */}
            <FormControl
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Product...'
                className='mr-sm-2 ml-sm-5'
                style={{ color: "black", fontWeight: "500" }}
            />
            {/* Input field for the search keyword with event handlers to update the state. */}

            <Button type='submit' variant='outline-light' className='p-2 mx-2'>
                Search
            </Button>
            {/* Submit button to trigger the form submission. */}
        </Form>
    )
}

export default SearchBox
// Export the SearchBox component as the default export of this module.
