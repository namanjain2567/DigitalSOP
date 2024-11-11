import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);  // State to store the list of SOP files
  const [error, setError] = useState(null);  // State to store error messages

  // Fetch SOP files from the backend (Flask)
  useEffect(() => {
    axios.get('http://localhost:5000/get_sop_files')  // Adjust URL if needed
      .then(response => {
        setFiles(response.data.files);  // Set the fetched files to state
      })
      .catch(error => {
        setError('Error fetching SOP files');  // Display an error message if fetching fails
        console.error(error);  // Log the error for debugging
      });
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const newLocal = <li>No SOP files available.</li>;
  return (
    <div className="App">
      <h1>SOP Files</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error if any */}
      <ul>
  {files.length === 0 ? (
    newLocal // Display message if no files are found
  ) : (
    files.map((file, index) => (
      <li key={index}>{file}</li> // List each SOP file
    ))
  )}
</ul>

    </div>
  );
}

export default App;
