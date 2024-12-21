import React, { useState,useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { editUserProjectApi } from '../services/allApi';
import { EditResponseContext } from '../context/Contextshare';

// Icons for non-image files
import pdfIcon from '../assets/icons/pdf file icon.jpg';
import videoIcon from '../assets/icons/video icon.png';
import audioIcon from '../assets/icons/audio file icon.jpg';
import zipIcon from '../assets/icons/zip file icon.png';
import defaultIcon from '../assets/icons/default file icon.png';

function EditFiles({ project }) {
  const { setEditResponse } = useContext(EditResponseContext);

  const [key, setKey] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    projectImg: ""
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const handlefile = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;
  
    console.log("Selected file type:", file.type); // Debugging log
  
    // Determine the preview based on file type
    let previewUrl;
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file); // Image preview
    } else if (file.type === "application/pdf") {
      previewUrl = pdfIcon; // PDF file icon
    } else if (file.type.startsWith("video/")) {
      previewUrl = videoIcon; // Video file icon
    } else if (file.type.startsWith("audio/")) {
      previewUrl = audioIcon; // Audio file icon
    } else if (
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed"
    ) {
      previewUrl = zipIcon; // ZIP file icon
    } else {
      previewUrl = defaultIcon; // Default file icon
    }
  
    setPreview(previewUrl); // Set the preview
    setProjectDetails({ ...projectDetails, projectImg: file }); // Update project details
  };
  

  const getFilePreview = (file) => {
    if (file.type.startsWith("image/")) return URL.createObjectURL(file);
    if (file.type === "application/pdf") return pdfIcon;
    if (file.type.startsWith("video/")) return videoIcon;
    if (file.type.startsWith("audio/")) return audioIcon;
    if (file.type === "application/zip" || file.type === "application/x-zip-compressed") return zipIcon;
    return defaultIcon;
  };

  useEffect(() => {
    if (projectDetails.projectImg) {
      const file = projectDetails.projectImg;
  
      let previewUrl;
      if (file.type.startsWith("image/")) {
        previewUrl = URL.createObjectURL(file);
      } else if (file.type === "application/pdf") {
        previewUrl = pdfIcon;
      } else if (file.type.startsWith("video/")) {
        previewUrl = videoIcon;
      } else if (file.type.startsWith("audio/")) {
        previewUrl = audioIcon;
      } else if (
        file.type === "application/zip" ||
        file.type === "application/x-zip-compressed"
      ) {
        previewUrl = zipIcon;
      } else {
        previewUrl = defaultIcon;
      }
  
      setPreview(previewUrl);
    }
  }, [projectDetails.projectImg]);
  

  const resetForm = () => {
    setProjectDetails({
      title: project.title,
      projectImg: ""
    });
    setPreview("");
    setKey(!key);
  };

  const handleEdit = async () => {
    const { title, projectImg } = projectDetails;

    if (!title && !projectImg) {
      alert("Please edit at least one field.");
      return;
    }

    const reqBody = new FormData();
    if (title) reqBody.append("title", title);
    if (projectImg) reqBody.append("projectImg", projectImg);

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await editUserProjectApi(project._id, reqBody, headers);
      if (result.status === 200) {
        alert("Project updated successfully!");
        handleClose();
        setEditResponse(result.data);
      } else {
        alert("Error updating project. Please try again.");
        handleClose();
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Something went wrong.");
      handleClose();
    }
  };

  return (
    <>
      <button className="btn btn-success rounded-3" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
            <label htmlFor="projImg">
  <input
    type="file"
    id="projImg"
    style={{ display: "none" }}
    key={key}
    onChange={handlefile}
  />
  <img
    src={preview || defaultIcon}
    alt="File Preview"
    className="w-100 img-thumbnail"
  />
</label>

            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={projectDetails.title}
                  onChange={(e) =>
                    setProjectDetails({ ...projectDetails, title: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditFiles;
