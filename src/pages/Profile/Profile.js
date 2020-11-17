import React, { Component, Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {
  Row, Col, Container
} from 'react-bootstrap';


class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
          <Fragment>
            <Navbar />
            <div className="ProfileContainer">
              <Container>
                  <Row className="profileInfo" style={{ marginTop: '5em'}}>
                    <Col sm={6}>
                      <h2>Enrique Goudet</h2>
                    </Col>
                    <Col sm={6}>
                      <h1>Your favorites</h1>
                    </Col>
                  </Row>
                  <Row className="favoritePlaces">
                    <h3>Favorite places go here</h3>
                  </Row>
              </Container>
            </div>
          </Fragment>
        );
    }
}

export default Profile;

