import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Card, 
  Button, 
  CardDeck, 
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

import { 
  Container, 
  Row, 
  Col,
  Breadcrumb,
} from 'react-bootstrap';

import config from 'react-global-configuration';

class RecentArticles extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      included: null,
    };
    this.loadArticles = this.loadArticles.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  
  render() {

    const { data, included, isHomePath } = this.state;

    return (
      <div>
        {!isHomePath && 
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Articles</Breadcrumb.Item>
          </Breadcrumb>}
        <Container fluid className="bg-light py-5">
          <Container>
            <Row>
              <Col> 
                <h1>Articles</h1>
                <CardDeck>
                  {data !== null && data !== undefined && data.length > 0 ?
                    data.slice(0, 3).map(item => <Article {...item} key={item.id} included={included}/>)
                    :
                    <div>No Articles found.</div>}
                </CardDeck>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }

  loadArticles() {
    
    const url = config.get('base_url') + '/jsonapi/node/article?include=field_image';
    
    // Fetch Articles.
    fetch(url, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('Fetching Articles Failed', err));
  }

  updateData(responseData) {
    this.setState({
      data: responseData.data,
      included: responseData.included
    });
  }

  componentDidMount() {
    this.loadArticles();
  }
}

class Article extends Component {

  render() {
    
    const {
      attributes,
      relationships,
      included,
    } = this.props;
    
    const baseUrl = config.get('base_url');

    // get the image for this article 
    const img = relationships.field_image.data && included.find(inc => inc.id === relationships.field_image.data.id);
    
    return (
      <Card>
        {img && 
          <Card.Img variant="top" src={baseUrl + img.attributes.uri.url}/>
        }
        <Card.Body className="">
          <Card.Title>{attributes.title}</Card.Title>
          <Button as={Link} to={attributes.path.alias} variant="secondary" size="lg" disabled>
            Read more
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default RecentArticles;
