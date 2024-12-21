import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { homeProjectApi } from '../services/allApi';
import FileCard from '../components/FileCard';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';

function LandingPage() {
  const [token, setToken] = useState('');
  const [homeProject, setHomeProject] = useState([]);

  const gethomeProject = async () => {
    const result = await homeProjectApi();
    setHomeProject(result.data);
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }
    gethomeProject();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: '#2e4053', minHeight: '100vh' }}>
        <div className="container">
          <h1 className="text-light text-center">Discover a World of Seamless File Sharing</h1>
          <h4 className="text-light mt-4">
            Welcome to <span className="text-primary">Q Data</span>, your ultimate destination for effortless file hosting and sharing. Our platform is
            designed to cater to the needs of individuals and businesses alike, providing a secure and convenient solution for storing and accessing
            your valuable files. From personal documents to large-scale project data, we offer ample storage space and lightning-fast upload and
            download speeds.
          </h4>

          <h4 className="text-light mt-4">
            Experience the freedom of sharing files with ease. Whether you're collaborating with colleagues, sharing photos with friends, or
            distributing important documents, our intuitive interface makes it a breeze. With advanced security measures in place, you can rest assured
            that your files are protected from unauthorized access.
          </h4>

          <div className="d-flex flex-column align-items-center my-5">
            <button className="btn btn-primary" style={{ color: 'white', height: '60px', width: '230px' }}>
              <Link to="/register" style={{ textDecoration: 'none', color: 'white', fontSize: '28px' }}>
                Get Started
              </Link>
            </button>
            <h3 className="text-light mt-3">
              Already a user? <Link to="/login">Login</Link>
            </h3>
          </div>

          {/* Pricing Section */}
          <section>
            <div className="row">
              <h1 className="text-light my-5 text-center">Pricing</h1>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                <Card style={{ width: '100%', maxWidth: '300px', height: '580px' }}>
                  <Card.Body>
                    <Card.Title style={{color:'burlywood'}}>Basic</Card.Title>
                    <Card.Text>
                      <ul>
                        <li>1 User</li>
                        <li>2 GB Storage</li>
                        <li>Connect all your devices</li>
                        <li>Transfer files easily</li>
                        <li>30 days to restore deleted files</li>
                      </ul>
                      <h1 style={{marginTop:'235px'}}>Free</h1>
                    </Card.Text>
                    <Button className="mt-4" style={{ width: '100%', maxWidth: '200px' }} variant="primary rounded-5">
                      BUY Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-4">
                <Card style={{ width: '100%', maxWidth: '300px', height: '580px' }}>
                  <Card.Body>
                    <Card.Title style={{color:'#8b0000'}}>Professional</Card.Title>
                    <Card.Text>
                      <ul>
                        <li>1 User</li>
                        <li>2 TB Storage</li>
                        <li>Connect all your devices</li>
                        <li>Transfer files fast</li>
                        <li>90 days to restore deleted files</li>
                        <li>Password-protect any files</li>
                        <li>Compress files</li>
                      </ul>
                      <h1 style={{marginTop:'185px'}}>Rs:399/-</h1>
                    </Card.Text>
                    <Button className="mt-4" style={{ width: '100%', maxWidth: '200px' }} variant="primary rounded-5">
                      BUY Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center mb-4">
                <Card style={{ width: '100%', maxWidth: '300px', height: '580px' }}>
                  <Card.Body>
                    <Card.Title style={{color:'#a4863d'}}>Business</Card.Title>
                    <Card.Text>
                      <ul>
                        <li>3+ Users</li>
                        <li>Up to 7 TB Storage</li>
                        <li>Connect all your devices</li>
                        <li>Transfer files superfast</li>
                        <li>180 days to restore deleted files</li>
                        <li>Password-protect files</li>
                        <li>Team folders for organized files</li>
                        <li>Roles, groups, and permissions</li>
                        <li>Admin manage file access</li>
                        <li>Compress files</li>
                        <li>Manage team sharing activity</li>
                      </ul>
                      <h1>Rs:1500/-</h1>
                    </Card.Text>
                    <Button className="mt-4" style={{ width: '100%', maxWidth: '200px' }} variant="primary rounded-5">
                      BUY Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section>
            <h1 className="text-center text-light my-5">Frequently Asked Questions</h1>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is Q Data?</Accordion.Header>
                <Accordion.Body>
                  Q Data is a file hosting platform offering seamless file storage and sharing services for individuals and businesses.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How do I upload files to the platform?</Accordion.Header>
                <Accordion.Body>Uploading files is simple. After signing in, click the "Upload" button on the dashboard. You can drag and drop files or use the "Browse" option to select files from your device. Once selected, click "Submit" to complete the upload process.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>How secure are my files?</Accordion.Header>
                <Accordion.Body>We use advanced security measures to ensure that your files are safe from unauthorized access.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Can I share my files with others?</Accordion.Header>
                <Accordion.Body>Yes, sharing is easy. Navigate to the file you want to share, click the "Share" button, and generate a shareable link. You can also set permissions like "view-only" or "editable" and add expiration dates for added security.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>

          {/* Reviews Section */}
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <h1 className="text-light text-center my-5">Reviews</h1>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5 d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '300px', height: '100%' }}>
                  <Card.Body style={{marginLeft:'28px'}}>
                    <img
                      src="https://media.istockphoto.com/id/1394149744/photo/headshot-of-early-20s-middle-eastern-woman.jpg?s=612x612&w=0&k=20&c=Q4gBjPUfikbPtkFh3I9_CoLF53H8Bz9FAfxiMOO7eIY="
                      alt=""
                      /* className="img-fluid rounded-circle mb-3" */
                      style={{ width: '220px', height: '220px', borderRadius: '50%' }}
                    />
                    <Card.Text>
                      <h3 className='mt-3 ms-5'>Aisha H</h3>
                      <h5>Graphics Designer</h5>
                      <p>
                        "I had trouble accessing my files once due to a forgotten password, but the support team helped me recover everything quickly.
                        It's rare to find such efficient support these days."
                      </p>
                      <div className='mt-4'>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStarHalf} size="xl" style={{ color: '#FFD43B' }} />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-5 d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '300px', height: '100%' }}>
                  <Card.Body style={{marginLeft:'28px'}}>
                    <img
                      src="https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=ovIQ5GPurLd3mOUj82jB9v-bjGZ8updgy1ACaHMeEC0="
                      alt=""
                     
                     style={{ width: '220px', height: '220px', borderRadius: '50%' }}
                    />
                    <Card.Text>
                      <h3 className='mt-3 ms-5'>Rajiv K.</h3>
                      <h5 className='ms-5'>Film Editor</h5>
                      <p>
                        I use this website to share large files with my team. The version control and permission settings are a lifesaver for
                        collaborative projects. However, I wish the free plan had a bit more storage.
                      </p>
                      <div>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center mb-5">
                <Card style={{ width: '100%', maxWidth: '300px', height: '100%' }}>
                  <Card.Body style={{marginLeft:'28px'}}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuS4MzMfdIWA2oJkmGbtqJ94J409KvE35q3w&s"
                      alt=""
                      style={{ width: '220px', height: '220px', borderRadius: '50%' }}
                    />
                    <Card.Text>
                      <h3 className='mt-3 ms-5 me-5'>Sophia M</h3>
                      <h5 className='ms-3'>DevOps Engineer</h5>
                      <p>
                        I've been using this platform for over a year now, and it's been fantastic. The interface is user-friendly, and the file
                        sharing options are seamless. I also appreciate the focus on security.
                      </p>
                      <div className='mt-4'>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#FFD43B' }} />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
