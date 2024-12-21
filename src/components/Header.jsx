import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Contextshare';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import OffCanvasExample from './SideBar';

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { setIsLoginStatus } = useContext(isLoginAuthContext);
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    setIsLoginStatus(false);
    navigate('/');
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);
    }
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-primary" style={{ height: "100px" }}>
        <Container fluid>
          <Navbar.Brand className="d-flex" href="#">
            <Link to={'/'}>
              <img 
                src="https://cdn.dribbble.com/userupload/13800051/file/original-f8c314e9182444e4bd41a91835a0331e.png?resize=400x0" 
                alt="Q" 
                style={{ height: "40px" }} 
              />
            </Link>
            <h2 className="text-light ms-3 fw-3">
              <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Q Data</Link>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 mx-5" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link className="text-light ms-5" href=""><h4>Features</h4></Nav.Link>
              <Nav.Link className="text-light ms-5" href=""><h4>Solutions</h4></Nav.Link>
              <Nav.Link className="text-light ms-5" href=""><h4>Help</h4></Nav.Link>
              <Nav.Link className="text-light ms-5" href="#"><h4>Pricing</h4></Nav.Link>
            </Nav>
            <Form className="d-flex">
              <div>
                {token ? (
                  <Button onClick={logout} variant="outline-light me-2">Sign Out</Button>
                ) : (
                  <Button onClick={() => navigate('/login')} variant="outline-light me-3">Sign In</Button>
                )}
              </div>
              <Button variant="outline-light ms-3" onClick={() => setShowSidebar(true)}>
                <FontAwesomeIcon icon={faUser} size="lg" className='me-2' />{username}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Sidebar Component */}
      <OffCanvasExample show={showSidebar} onHide={() => setShowSidebar(false)} />
    </>
  );
}

export default Header;
