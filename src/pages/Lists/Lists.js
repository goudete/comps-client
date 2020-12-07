import React, { Component, Fragment } from 'react';
import Map from '../../components/Map/Map';
import axios from 'axios';
import { Icon } from '@blueprintjs/core'

import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';

import './Lists.css'
import '../../global.css';

class Lists extends React.Component {
  constructor(props){
    super(props)

  }

  render() {
    const logged_in = this.props.auth.checkAuth();
    return (
      logged_in ?
      (
        <div className="mainContent">
          <h1>Hello Lists</h1>
          <h3>View My Lists</h3>
          <h3>Add to Exisitng List</h3>
          <h3>Create New List</h3>
        </div>
      ) :
      (<Redirect to = "/login" />)
    );
  }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Lists auth = {a}/>}
    </Subscribe>
  )
}
