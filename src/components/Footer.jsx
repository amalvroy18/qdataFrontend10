import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const iconStyle = (icon) => ({
    color: hoveredIcon === icon ? '#96c93d' : 'white',
    transition: 'color 0.3s ease',
    border: '3px solid white',
    borderRadius: '50%',
    padding: '10px',
    fontSize: '20px',
  });

  const footerStyle = {
    background: 'linear-gradient(to right, #3f2b96, #11998e)',
    color: '#fff',
    padding: '40px 0',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        {/* Top Section */}
        <Row>
          <Col xs={12} className="text-center">
            <h2 className="text-white fs-4 fs-md-2">
              Store, Share, and Access Your Files with Ease and Security
            </h2>
            <p className="mt-3 text-light fs-6 fs-md-5 text-justify">
              Welcome to Q Data, your trusted platform for secure and reliable file hosting. Whether you need to share documents, images, videos, or large files, our service ensures fast uploads, seamless downloads, and top-tier data protection. Explore our features and start storing your important data with confidence today.
            </p>
            <Button variant="outline-light" size="lg" className="mt-3">
              Create Account
            </Button>
          </Col>
        </Row>

        {/* Subscription Section */}
        <Row className="mt-4">
          <Col xs={12} md={10} className="text-center mx-auto">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <h3
                className="text-light mb-3 mb-md-0 me-md-3"
                style={{ whiteSpace: 'nowrap' }}
              >
                For Updates:
              </h3>
              <Form className="d-flex flex-column flex-md-row align-items-center w-100 w-md-auto">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  className="rounded mb-3 mb-md-0 flex-grow-1"
                />
                <Button variant="outline-light" className="ms-md-3">
                  Subscribe
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Links and Social Section */}
        <Row className="mt-5">
          {/* Left Column */}
          <Col xs={12} sm={6} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-light text-decoration-none">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-light text-decoration-none">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-light text-decoration-none">
                  Settings
                </Link>
              </li>
              <li>Plans</li>
              <li>Dash</li>
              <li>F.A.Q</li>
            </ul>
          </Col>
          {/* Center Column */}
          <Col xs={12} sm={6} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>Security Access</li>
              <li>Cookie Settings</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
              <li>Contact Us</li>
              <li>Product Updates</li>
            </ul>
          </Col>
          {/* Right Column */}
          <Col xs={12} sm={6} md={4} className="text-center">
            <ul className="list-unstyled">
              <li>Customer Review</li>
              <li>Community Forums</li>
              <li>Blog</li>
              <li>Referral</li>
              <li>About Us</li>
              <li>Jobs</li>
              <li>Learning Resources</li>
            </ul>
          </Col>
        </Row>

        {/* Social Icons Section */}
        <Row className="mt-4">
          <Col xs={12} className="text-center">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <FontAwesomeIcon
                icon={faFacebook}
                style={iconStyle('facebook')}
                onMouseEnter={() => setHoveredIcon('facebook')}
                onMouseLeave={() => setHoveredIcon(null)}
              />
              <FontAwesomeIcon
                icon={faInstagram}
                style={iconStyle('instagram')}
                onMouseEnter={() => setHoveredIcon('instagram')}
                onMouseLeave={() => setHoveredIcon(null)}
              />
              <FontAwesomeIcon
                icon={faTwitter}
                style={iconStyle('twitter')}
                onMouseEnter={() => setHoveredIcon('twitter')}
                onMouseLeave={() => setHoveredIcon(null)}
              />
              <FontAwesomeIcon
                icon={faLinkedinIn}
                style={iconStyle('linkedin')}
                onMouseEnter={() => setHoveredIcon('linkedin')}
                onMouseLeave={() => setHoveredIcon(null)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
