import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm'
import "./Signup.css"
import {
    Row, Col, Container
} from 'react-bootstrap';


class Signup extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="SignUpContainer">
                <Container>
                    <Row>
                        <Col sm={6}>
                            <div className="LandingTextWrapper" style={{display: 'block'}}>
                                <h1 className="LandingText">Comps</h1>
                            </div>
                        </Col> 
                        <Col sm={6}>
                            <div className="SignupForm">
                                <SignupForm />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Signup;