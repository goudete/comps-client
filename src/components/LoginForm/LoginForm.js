import React from 'react';
import { Card, Elevation, Button } from "@blueprintjs/core";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';

import '../../pages/Login/Login.css'
import { Redirect, Link } from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    validForm(){
        if (
            this.state.username !== '' &&
            this.state.password !== ''
        ){
            return true
        } 
        else {
            return false
        }

    }
    sendInfo() {
        if(this.validForm()){
            this.postData();
        } else {
            alert('Error, please try again')
        }
    }
    async postData(){
        try{
            await this.props.auth.handleLogin(this.state.username, this.state.password)
        }
        catch(e){
            alert(e);
        }
    }

    render() {

        return (
            this.props.auth.state.token ?
            (
                <Redirect to='/home' />
            )
            :
            (
            <div>
                <Card className="loginForm" elevation={Elevation.TWO}>
                <h5>Login to clustr</h5>
                    <Form>
                        <FormGroup>
                            <Label for="">Username:</Label>
                            <Input
                                name="username"
                                id="username"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Password:</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </FormGroup>
                    </Form>
                    <Button text={'login'} style={{ width: '100%'}} onClick={() => this.sendInfo()} />
                    <div style={{justifyContent: "center"}}>Dont have an account? <Link to="/">Signup</Link> </div>
                </Card>
            </div>
            )
        );
    }
}

export default props => {
    return (
      <Subscribe to={[AuthContainer]}>
        {(a) => <LoginForm auth = {a}/>}
      </Subscribe>
    )
  }