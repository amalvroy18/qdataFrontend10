import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { serverUrl } from '../services/serverUrl';
import { addResponseContext, EditResponseContext } from '../context/Contextshare';
import { removeUserProjectApi, userProjectApi } from '../services/allApi';
import EditFiles from './EditFiles';


// Icons for non-image files
import pdfIcon from '../assets/icons/pdf file icon.jpg';
import videoIcon from '../assets/icons/video icon.png';
import audioIcon from '../assets/icons/audio file icon.jpg';
import zipIcon from '../assets/icons/zip file icon.png';
import defaultIcon from '../assets/icons/default file icon.png';
import { faBluetoothB, faCloudflare, faFacebook, faGoogleDrive, faPinterest, faTelegram, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
faCloudflare


function FileCard({ project }) {
  const [show, setShow] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false); // State for share modal
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [userProject, setUserProject] = useState(null);

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const { addResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(EditResponseContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShareModalClose = () => setShowShareModal(false);
  const handleShareModalShow = () => setShowShareModal(true);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (userData) {
      setUsername(userData.username);
      setUserId(userData._id);
    } else {
      setUsername('guestUser');
      setUserId('unknownUserId');
    }
  }, []);

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
    const result = await userProjectApi(reqHeader);
    const matchingProject = result.data.find((item) => item._id === project._id);
    setUserProject(matchingProject);
  };

  const handleDelete = async (id) => {
    const result = await removeUserProjectApi(id);
    if (result.status === 200) {
      setDeleteStatus(true);
    }
  };

  const getFilePreview = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
      return `${serverUrl}/uploads/${fileName}`;
    } else if (fileExtension === 'pdf') {
      return pdfIcon;
    } else if (['mp4', 'mkv', 'avi'].includes(fileExtension)) {
      return videoIcon;
    } else if (['mp3', 'wav'].includes(fileExtension)) {
      return audioIcon;
    } else if (['zip', 'rar'].includes(fileExtension)) {
      return zipIcon;
    }
    return defaultIcon;
  };

  useEffect(() => {
    getUserProject();
    setDeleteStatus(false);
  }, [addResponse, deleteStatus, editResponse]);

  if (!userProject) return null; // Hide projects that don't belong to the user

  const preview = getFilePreview(project?.projectImage);

  return (
    <>
      <Card style={{ width: '18rem' }} className="shadow mb-5 mt-4">
        {/* File Preview */}
        <Card.Img
          variant="top"
          src={preview}
          style={{ width: '100%', height: '200px' }}
          onClick={handleShow}
        />

        {/* File Details */}
        <Card.Body>
          <Card.Title className="text-center mb-2">{project?.title}</Card.Title>

          {/* Button Group */}
          <div className="d-flex justify-content-around">
            <div className="btn-group btn-group-sm rounded" role="group" aria-label="Small button group">
              <button className="btn btn-success">
                <EditFiles project={userProject} />
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(userProject._id);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareModalShow();
                }}
              >
                Share
              </button>
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  const fileUrl = `${serverUrl}/uploads/${project?.projectImage}`;
                  window.open(fileUrl, "_blank");
                }}
              >
                Open
              </button>
            </div>
          </div>
        </Card.Body>

        {/* File Preview Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{project?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={preview} alt="Preview" className="w-100" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={handleShareModalClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered style={{backgroundColor:'gray'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: '600' }}>Share this File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
          <div className='d-flex justify-content-end align-items-center'>
          <Form.Label className="me-auto"><h4>File link</h4></Form.Label>
         <Dropdown>
         <Dropdown.Toggle
               variant="light"
           style={{
        backgroundColor: '#e8eaf6',
        color: '#3f51b5',
        fontWeight: '500',
        border: 'none',
      }}
    >
      View only
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item>View only</Dropdown.Item>
      <Dropdown.Item>Can edit</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>

            
            <div className="d-flex mt-5">
              <Form.Control
                type="text"
                className="shadow rounded-5"
                value={`https://www.qdata/${username}/${userId}/${project?.projectImage}`}
                readOnly
                style={{
                  backgroundColor: '#f1f3f5',
                  border: 'none',
                  padding: '8px',
                  maxWidth: '75%',
                 
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              />
              <Button
                className="mx-4"
                style={{
                  backgroundColor: '#6c63ff',
                  color: 'white',
                  border: 'none',
                }}
                onClick={() => navigator.clipboard.writeText(
                  `https://www.qdata/${username}/${userId}/${project?.projectImage}`
                )}
              >
                Copy link
              </Button>
            </div>
            
            <button className="btn mt-5" style={{ color: 'white',backgroundColor: '#6c63ff', height: '40px', width: '170px',marginLeft:'300px'}}>
                Download
            </button>

            <div className='mt-5' style={{ display: 'flex', gap: '30px', marginTop: '16px' }}>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px',display: 'flex',alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff', }}>
            <FontAwesomeIcon icon={faXTwitter} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff',}}>
            <FontAwesomeIcon icon={faFacebook} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px',display: 'flex',alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff', }}>
            <FontAwesomeIcon icon={faBluetoothB} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff',}}>
            <FontAwesomeIcon icon={faGoogleDrive} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px',display: 'flex',alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff', }}>
            <FontAwesomeIcon icon={faTelegram} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff',}}>
            <FontAwesomeIcon icon={faWhatsapp} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px',display: 'flex',alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff', }}>
            <FontAwesomeIcon icon={faCloudflare} size="2xl" style={{color: "#ffffff",}} />
            </Button>
            <Button variant="light" style={{ borderRadius: '50%', width: '70px',height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6c63ff',}}>
            <FontAwesomeIcon icon={faPinterest} size="2xl" style={{color: "#ffffff",}} />
            </Button>
          </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShareModalClose} style={{ backgroundColor: '#6c63ff', color: 'white', border: 'none', fontWeight: '600', borderRadius: '6px',padding: '10px 20px',}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FileCard;
