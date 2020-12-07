import React, { Component, Fragment } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm'
import AuthContainer from '../../containers/AuthContainer';
import {
    Row, Col, Container
} from 'react-bootstrap';


import "./Login.css"
import { Subscribe } from 'unstated';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Fragment>
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

export default props => {
    return (
        <Subscribe to={[AuthContainer]}>
            {(a) => <Login auth = {a}/>}
        </Subscribe>
    )
}