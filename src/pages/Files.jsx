import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FileCard from '../components/FileCard';
import { Link } from 'react-router-dom';
import { allProjectApi } from '../services/allApi';
import AddFiles from '../components/AddFiles';
import { addResponseContext, EditResponseContext } from '../context/Contextshare'


function Files() {
  const {addResponse} = useContext(addResponseContext)
  const {editResponse} = useContext(addResponseContext)

  const [isToken, setIsToken] = useState(""); // State to check if user is logged in
  const [allProject, setAllProject] = useState([]); // State to store all project data
  const [searchKey, setSearchKey] = useState(""); // State for the search input

  // Function to fetch all projects
  const getAllProject = async () => {
    try {
      // Make API call to get all projects, based on the search key
      const result = await allProjectApi(searchKey);

      if (result?.data) {
        setAllProject(result.data); // Set the fetched projects in state
      }
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    getAllProject(); // Fetch projects when the component mounts or searchKey changes
  }, [searchKey,addResponse,editResponse]);

  /* useEffect(() => {
  console.log("addResponse:", addResponse);
  console.log("editResponse:", editResponse);
}, [addResponse, editResponse]); */


  useEffect(() => {
    // Check if there is a token in session storage (user is logged in)
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsToken(token);
    }
  }, [addResponse,editResponse]);

  return (
    <div className='container-fluid'>
      <h1 className='text-center mt-2'>All Files</h1>

      {/* Files when logged in */}
      {isToken ? (
        <div>
          <div className="row my-4">
            <div className="col-md-1"></div>
            <div className="col-md-9 d-flex justify-content-center align-items-center">
              {/* Search Bar */}
              <input
                type="text"
                className='form-control mb-5 rounded-5'
                placeholder='Search'
                onChange={(e) => setSearchKey(e.target.value)} // Update searchKey state
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                rotation={90}
                style={{
                  marginTop: '-46px',
                  marginLeft: '-40px',
                  color: 'gray',
                }}
              />
            </div>
            <div className="col-md-2">
              <AddFiles /> 
             
            </div>
          </div>

          <div className="row my-5">
            {allProject?.length > 0 ? (
              // If projects are available, display them
              allProject.map((item) => (
                <div className="col-md-4 p-4" key={item._id}>
                  <FileCard project={item} /> {/* Display each project */}
                </div>
              ))
            ) : (
              <p className='text-danger ms-5'>No Projects</p> // Message when no projects are available
            )}
          </div>
        </div>
      ) : (
        // Files when not logged in
        <div className="row mt-5 w-100">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-4 d-flex justify-content-center align-items-center flex-column">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/a78d7491269521.5e3166194e2b2.gif"
              alt="no image"
              width={'100%'}
              height={'300px'}
            />
            <h4 className='mt-5'>
              Please <Link to={'/login'}>Login</Link> to Explore more files
            </h4>
          </div>
          <div className="col-md-4"></div>
        </div>
      )}
    </div>
  );
}

export default Files;
