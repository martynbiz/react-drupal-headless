import React, { Component } from 'react';

import {
  Link,
} from 'react-router-dom';

import { 
    Breadcrumb,
} from 'react-bootstrap';

class BreadcrumbBlock extends Component {
  
  render() {
    const { location } = this.props;
    const { currentPath } = this.state;
    
    if (location.pathname !== currentPath) {
      this.translatePath(location);
    }
    
    return (
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>About us</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default BreadcrumbBlock