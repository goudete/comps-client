import React, { Component, Fragment } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import Navbaroo from '../../components/Navbar/Navbar';
import axios from 'axios';
import {
  Row, Col, Container
} from 'react-bootstrap';


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      places: []
    }
  }
  componentDidMount() {
    axios.get(`/places`)
      .then(res => {
        const places = res.data;
        this.setState({ places });
      })
  }

  render() {
    return (
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
    );
  }
}

export default Home;
