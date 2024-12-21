import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

// Icons for non-image files
import pdfIcon from '../assets/icons/pdf file icon.jpg';
import videoIcon from '../assets/icons/video icon.png';
import audioIcon from '../assets/icons/audio file icon.jpg';
import zipIcon from '../assets/icons/zip file icon.png';
import defaultIcon from '../assets/icons/default file icon.png';

function AddFiles() {
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    projectImg: ""
  });
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(false);
  const { setAddResponse } = useContext(addResponseContext);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    handleClose1();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setProjectDetails({ ...projectDetails, projectImg: file });
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith('image/')) return URL.createObjectURL(file);
    if (file.type === 'application/pdf') return pdfIcon;
    if (file.type.startsWith('video/')) return videoIcon;
    if (file.type.startsWith('audio/')) return audioIcon;
    if (file.type === 'application/zip' || file.type === 'application/x-zip-compressed') return zipIcon;
    return defaultIcon;
  };

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(getFilePreview(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

  const handleClose1 = () => {
    setProjectDetails({ title: "", projectImg: "" });
    setPreview("");
    setKey(!key);
  };
  console.log(projectDetails);

  const handleAddProject = async () => {
    const { title, projectImg } = projectDetails;
  
    if (!title || !projectImg) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("projectImg", projectImg);
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Token is missing.");
      return;
    }
  
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
  
    try {
      const result = await addProjectApi(reqBody, reqHeader);
  
      if (result.status == 200) {
        setAddResponse(result.data)
        alert('Project added successfully.');
        window.location.reload(); // Refreshes the page after successful addition
      } else {
        const errorMessage = result?.data?.message || 'Something went wrong. Please try again.';
        alert(errorMessage);
        handleClose();
      }
    } catch (error) {
      console.error("Error while adding project:", error);
      const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again later.';
      alert(errorMessage);
      handleClose();
    }
  };
  
  

  return (
    <>
      <button className='btn btn-success rounded-3' onClick={handleShow}>Add Files</button>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor='projImg'>
                <input type="file" id='projImg' style={{ display: 'none' }} key={key} onChange={handleFile} />
                <img src={preview || defaultIcon} alt="File Preview" className='w-100 img-thumbnail'/>
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input type="text" placeholder='Title' className='form-control' value={projectDetails.title}
                  onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>Cancel</Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFiles;
 






