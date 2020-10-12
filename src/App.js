import React, { Component } from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Homepage from "./Components/Homepage";
import NotFound from './Components/NotFound';

import { 
  Navbar, 
  Nav, 
  Form,
  FormControl,
  NavDropdown,
  Button
} from 'react-bootstrap';
  
const LIST_URL = 'http://localhost:8085/jsonapi/node/article?include=field_image';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      included: null,
    };
    this.loadNews = this.loadNews.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar className="navbar-dark bg-dark" expand="lg">
            <Navbar.Brand href="#home">Scottish Centre for Alternative Technology</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light dark">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/" component={Homepage}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  loadNews() {
    // Fetch News.
    fetch(LIST_URL, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('Fetching News Failed', err));
  }

  updateData(responseData) {
    this.setState({
      data: responseData.data,
      included: responseData.included
    });
  }

  componentWillMount() {
    this.loadNews();
  }
}

export default App;
