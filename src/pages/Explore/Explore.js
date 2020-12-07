import React, { Component, Fragment } from 'react';
import Map from '../../components/Map/Map';
import axios from 'axios';
import { Icon } from '@blueprintjs/core'
import { Card, Elevation, Button } from "@blueprintjs/core";
import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';
import Navbaroo from '../../components/Navbar/Navbar'


// import './Explore.css'
import '../../global.css';

class Explore extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        recs: [],
    }
  }
  componentDidMount() {
    axios.post(`/recommender/`, {
        'user_id': `${this.props.auth.state.user_id}`
    },
    {
      headers: {
        'Authorization': `Token ${this.props.auth.state.token}`
      }
    })
      .then(res => {
        const recs = res.data;
        console.log('recs: ' + recs)
        this.setState({ recs });
      })
  }

  render() {
    const logged_in = this.props.auth.checkAuth();
    return (
      logged_in ?
      (
        <Fragment>
          <Navbaroo />
          <div className="mainContent" style={{ marginTop: '4em'}}>
            
            <h1>Explore</h1>

                {
                  this.state.recs.recommendations &&
                      this.state.recs.recommendations.map(r => (
                          <Card elevation={Elevation.TWO} style={{marginTop: '1em'}}>
                              <h2>{r.name}</h2>
                              <h5>{r.address}</h5>
                              <p>{r.instagram}</p>
                          </Card>
                      ))
                }

            
          </div>
        </Fragment>
      ) :
      (<Redirect to = "/login" />)
    );
  }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Explore auth = {a}/>}
    </Subscribe>
  )
}
