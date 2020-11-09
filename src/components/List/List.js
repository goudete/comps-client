import React, { Component } from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";


class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      places
    } = this.props;
    return (
      <Card style={{ width: '75%'}}>
        <h4>{places.map( obj => <div>{obj.name}</div> )}</h4>
      </Card>
    );

  }
}



export default List;
