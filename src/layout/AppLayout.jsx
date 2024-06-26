import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import './AppLayout.css';
import { useState } from 'react';

const AppLayout = () => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchByKeyword = (event) => {
    event.preventDefault()
    // url을 바꿔주기 (키워드로 서치된 Movies 페이지로 이동하는 것이기에)
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  }

  return (
    <div>
        <Navbar data-bs-theme="dark" variant="primary" expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand onClick={()=>{ navigate('/'); }}>
                <img                     
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
                    alt="" 
                    style={{ width: '7rem' }}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link onClick={()=>{ navigate('/'); }}>Home</Nav.Link>
                <Nav.Link onClick={()=>{ navigate('/Movies'); }}>Movies</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={searchByKeyword}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="input-search me-2"
                  aria-label="Search"
                  value={keyword}
                  onChange={(event)=> setKeyword(event.target.value)}
                />
                <Button variant="search outline-success" type="submit">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Outlet />       
    </div>
  )
}

export default AppLayout
