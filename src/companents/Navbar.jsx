import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

function Navbar() {
  const [show, setShow] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);  
  const [offcanvasStyle, setOffcanvasStyle] = useState({});

  const toggleOffcanvas = () => {
    setShow(true);
    setOpenedByClick(true);
    setOffcanvasStyle({
        width: '15rem',
        top : '50px'
      });
  };

  const handleClose = () => {
    setShow(false);
    setOpenedByClick(false);
  };

  const handleMouseEnter = () => {
    if (!openedByClick) {
      setShow(true);
      setOffcanvasStyle({
        opacity: 0.7,
        width: '12rem',
        top : '50px'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!openedByClick) {
      setShow(false);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-start" style={{ position: 'relative' }}>
        <Button
          className="btn border"
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleOffcanvas}
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div style={{ marginLeft: '20px', position: 'relative' }}>
          <Offcanvas show={show} onHide={handleClose} style={offcanvasStyle} className={`offcanvas offcanvas-start ${show ? 'show' : 'pr-[1000px]'}`} backdrop={false}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life, you can have elements like text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <a className="navbar-brand" style={{ marginLeft: '60px' }} href="#">Bitrix<span style={{ color: 'blue', marginLeft: '3px' }}>24</span></a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit"></button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
