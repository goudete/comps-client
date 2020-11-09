import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";
import { Form, FormGroup, Label, Input } from 'reactstrap';

import '../../pages/Login/Login.css'


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        //handle input function
    }

    render() {
        return (
            <div>
                <Card className="loginForm" elevation={Elevation.TWO}>
                <h5>Login to clustr</h5>
                    <Form>
                        <FormGroup>
                            <Label for="">Username:</Label>
                            <Input
                                name="username"
                                id="username"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Password:</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default LoginForm;