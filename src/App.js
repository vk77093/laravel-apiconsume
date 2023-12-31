import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditProduct from "./componets/edit.component.js";
import ProductList from "./componets/list.component.js";
import CreateProduct from "./componets/create.component.js";

//club
import Club from "./componets/Club/clubview.componet.js";
import CreateClub from "./componets/Club/clubcreate.componet.js";
import EditClub from "./componets/Club/clubedit.componet.js";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Crud App
        </Link>
        <Link to={"/clubdata"} className="navbar text-white">
          Club Data
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />


            <Route path="/clubdata" element={<Club/>}/>
            <Route path="/club/create" element={<CreateClub />} />
            <Route path="/club/edit/:id" element={<EditClub/>}/>
            <Route exact path='/' element={<ProductList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
