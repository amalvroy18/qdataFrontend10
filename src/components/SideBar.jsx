import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Profile from '../components/Profile';

function OffCanvasProfile({ show, onHide }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Profile />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffCanvasProfile;

