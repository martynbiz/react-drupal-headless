import React from 'react';

import { Card, Badge, Button } from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

const SITE_URL = 'http://localhost:8085';

export default class NewsItem extends React.Component {

  render() {
    
    const {
      id,
      attributes,
      relationships,
      included,
    } = this.props;

    // get the image for this article 
    const img = relationships.field_image.data && included.find(inc => inc.id === relationships.field_image.data.id);
    
    return (
      <Card>
        {img && 
          <Card.Img variant="top" src={SITE_URL + img.attributes.uri.url}/>
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