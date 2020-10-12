import React, { Component } from 'react';

class Page extends Component {

  constructor() {
    super();
    this.state = { 
      data: null,
      currentPath: null,
    };
  }
  
  render() {
    const { location } = this.props;
    const { data, currentPath } = this.state;
    if (location.pathname !== currentPath) {
      this.translatePath(location);
    }
    
    return (
      <div className="py-5">
        {data && data.attributes.body && 
          <div dangerouslySetInnerHTML={{__html: data.attributes.body.value}} />}
      </div>
    );
  }

  translatePath() {
    const { location } = this.props;
    fetch('http://localhost:8085/router/translate-path?path=' + location.pathname, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.loadContent(data))
      .catch(err => this.setState({
        data: null,
        currentPath: location.pathname,
      }));
  }

  loadContent(data) {
    const { location } = this.props;
    fetch(data.jsonapi.individual, {mode:'cors'})
      .then(function (response) {
        return response.json();
      })
      .then((data) => this.updateContent(data))
      .catch(err => this.setState({
        data: null,
        currentPath: location.pathname,
      }));
  }

  updateContent(responseData) {
    const { location } = this.props;
    this.setState({
      data: responseData.data,
      currentPath: location.pathname,
    });
  }
}

export default Page
