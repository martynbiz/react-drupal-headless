import React from 'react';
import PageComponent from "./PageComponent";

import { 
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { 
  Breadcrumb
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

class Article extends PageComponent {

  constructor() {
    super();
    this.state = { 
      data: null,
      currentPath: null,
    };
  }
  
  render() {
    const { location } = this.props;
    const { data, currentPath, isHomePath } = this.state;
    if (location.pathname !== currentPath) {
      this.translatePath(location);
    }
    
    return (
      <div>
        {!isHomePath && 
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/news"}}>News</Breadcrumb.Item>
            <Breadcrumb.Item active>{data && data.attributes.title}</Breadcrumb.Item>
          </Breadcrumb>}
        {data && data.attributes.body && 
          <Container className="py-5">
            <Row>
              <Col>
                <h1>{data.attributes.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}} />
              </Col>
            </Row>
          </Container>}
      </div>
    );
  }
}

export default Article
