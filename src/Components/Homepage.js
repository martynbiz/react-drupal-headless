import React, { Component } from 'react';

// import {
//   BrowserRouter,
//   Switch,
//   Route
// } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import NewsList from "./News/NewsList";

import { Container, Row, Col } from 'react-bootstrap';
  
const NEWS_LIST_URL = 'http://localhost:8085/jsonapi/node/article?include=field_image';

class Homepage extends Component {

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
      <div>
        <Container fluid className="bg-light py-5">
          <Container>
            <Row>
              <Col>
                <NewsList
                  data={this.state.data}
                  included={this.state.included}
                  limit={3}
                />  
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }

  loadNews() {
    // Fetch News.
    fetch(NEWS_LIST_URL, {mode:'cors'})
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

export default Homepage;
