import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../pages/Signup/Signup.css';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';
import {
    Link,
    Redirect
  } from "react-router-dom";


class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            loggedIn: false,
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }
    handleConfPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }
    validateForm() {
        if (
            this.state.username !== '' &&
            this.state.email !== '' &&
            this.state.password === this.state.confirmPassword
        ){
            return true
        }
        else {
            return false
        }
    }
    sendInfo() {
        if (this.validateForm()){
            this.postData();
        } else {
            alert('Form Invalid, please re-enter info')
        }
    }
    async postData(){
        try {
            await this.props.auth.handleSignup(this.state.email, this.state.username, this.state.password)
        }
        catch(e){
            alert(e);
        }
    }



    render() {
        // const isLoggedIn = this.props.auth.checkAuth()
        return (
            this.props.auth.state.logged_in ? 
            (<Redirect to="/home" />)
            :
            (
            <div>
                <Card className="SignupFormCard" elevation={Elevation.TWO}>
                    <h3 className="centerTitle">clustr</h3>
                    <h6 className="centerTitle">Popups in LA, for you </h6>
                    
                    <Form>
                        <FormGroup>
                            <Label for="">Username:</Label>
                            <Input
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Email:</Label>
                            <Input
                                name="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Password:</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Confirm Password:</Label>
                            <Input
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleConfPasswordChange}
                            />
                        </FormGroup>
                    </Form>
                    <Button active style={{ width: '100%' }} onClick={() => this.sendInfo()}>Give me the list</Button>
                    <div style={{justifyContent: "center"}}>Already have an account? <Link to="/login">Login</Link> </div>
                </Card>
            </div>
            )
        );
    }
}

export default props => {
    return (
        <Subscribe to={[AuthContainer]}>
            {(a) => <SignupForm auth={a} />}
        </Subscribe>
    )
}
