import React, { Component } from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import config from 'react-global-configuration';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Article from './Components/Article';
import BasicPage from './Components/BasicPage';
import RecentArticles from './Components/Views/RecentArticles';

import { 
  Navbar, 
  Nav, 
  Form,
  FormControl,
  NavDropdown,
  Button
} from 'react-bootstrap';

config.set({
  base_url: 'http://localhost:8085' 
});

class App extends Component {

  constructor() {
    super();
    this.state = { 
      data: null
    };
  }
  
  render() {    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar className="navbar-dark bg-dark" expand="lg">
            <Navbar.Brand href="#home">React Drupal Headless</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about-us">About</Nav.Link>
                <NavDropdown title="What's happening" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/news">Recent articles</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light dark">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/news" component={RecentArticles}/>
            <Route path="/news" render={(match) => <Article key={match.location.pathname} {...match}/>}/>
            <Route render={(match) => <BasicPage key={match.location.pathname} {...match}/>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
