import React, { Component, Fragment } from 'react';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import Navbaroo from '../../components/Navbar/Navbar';
import axios from 'axios';
import {
  Row, Col, Container
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      places: []
    }
  }
  componentDidMount() {
    axios.get(`/places`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        const places = res.data;
        console.log('PLACES: ' + places)
        this.setState({ places });
      })
  }

  render() {
    // const isLoggedIn = this.props.auth.checkAuth()
    return (
      this.props.auth.state.logged_in ?
      (
        <Fragment>
          <Navbaroo />
          <div className="HomeContainer">
            <Container>
                <Row style={{ marginTop: '5em'}}>
                  <Col sm={6}>
                    <h2>Your personalized list:</h2>
                    <List
                      places={this.state.places}
                    />
                  </Col>
                  <Col sm={6}>
                    <Map />
                  </Col>
                </Row>
                
            </Container>
          </div>
        </Fragment>
      )
      :
      (
        <Redirect to="/" />
      )
    );
  }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Home auth = {a}/>}
    </Subscribe>
  )
}
