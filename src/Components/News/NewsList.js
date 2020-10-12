import React from 'react';
import NewsItem from "./NewsItem";

import { CardDeck } from 'react-bootstrap';

export default class NewsList extends React.Component {

  render() {
    
    const { 
      data, 
      included,
      limit,
    } = this.props;

    return (
      <CardDeck>
        {data !== null &&
        data !== undefined &&
        data.length > 0 ?
          data.slice(0, limit).map(item => <NewsItem {...item} key={item.id} included={included}/>)
          :
          <div>No News found.</div>
        }
      </CardDeck>
    );
  }
}