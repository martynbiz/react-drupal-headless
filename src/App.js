import React, { Component } from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import News from './Components/News';
import NewsOne from './Components/NewsOne';
import Page from './Components/Page';

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
      data: null
    };
  }
  
  render() {
    
    const {
      data
    } = this.state;
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar className="navbar-dark bg-dark" expand="lg">
            <Navbar.Brand href="#home">Scottish Centre for Alternative Technology</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about-us">About</Nav.Link>
                <NavDropdown title="What's happening" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/news">News</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light dark">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/news" component={News}/>
            <Route path="/news" render={(match) => <NewsOne key={match.location.pathname} {...match}/>}/>
            <Route render={(match) => <Page key={match.location.pathname} {...match}/>}/>
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
