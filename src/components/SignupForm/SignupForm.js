import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../pages/Signup/Signup.css';


class SignupForm extends React.Component {
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
                <Card className="SignupFormCard" elevation={Elevation.TWO}>
                    <h3 className="centerTitle">clustr</h3>
                    <h6 className="centerTitle">Popups in LA, for you </h6>
                    
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
                            <Label for="">Email:</Label>
                            <Input
                                name="email"
                                id="email"
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
                        <FormGroup>
                            <Label for="">Confirm Password:</Label>
                            <Input
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                    </Form>
                    <Button active style={{ width: '100%' }}>Give me the list</Button>
                </Card>
            </div>
        );
    }
}

export default SignupForm;