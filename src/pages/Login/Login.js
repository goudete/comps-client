import React, { Component, Fragment } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm'
import Navbaroo from '../../components/Navbar/Navbar';
import {
    Row, Col, Container
} from 'react-bootstrap';


import "./Login.css"

class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Fragment>
                <Navbaroo />
                <div className="HomeContainer">
                <Container>
                    <Row style={{ marginTop: '5em'}}>
                        <Col sm={6}>
                        <h2>Engaging content goes here:</h2>
                        
                        </Col>
                        <Col sm={6}>
                            <LoginForm />
                        </Col>
                    </Row>
                    
                </Container>
                </div>
            </Fragment>
        );
    }
}

export default Login;