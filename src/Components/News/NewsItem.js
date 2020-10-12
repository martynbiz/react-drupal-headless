import React from 'react';

import { Card, Badge, Button } from 'react-bootstrap';

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
          <div dangerouslySetInnerHTML={{__html: attributes.body.value}} />
        </Card.Body>
      </Card>
    );
  }

}