import React, { Component } from 'react';
import { Navbar, Heading, Button, Alignment } from "@blueprintjs/core";
import { Menu, MenuDivider, MenuItem, Popover, Position, } from "@blueprintjs/core"
import AuthContainer from '../../containers/AuthContainer';
import { Subscribe } from 'unstated';



import './Navbar.css'


class Navbaroo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Navbar className="Navbar bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <div className="clustrLogo">
            clustr
          </div>
        </Navbar.Group>
        
        <Navbar.Group align={Alignment.RIGHT}>
          <div className="userName">
            <Button text={'logout'} onClick={() => this.props.auth.logout()} />
          </div>
        </Navbar.Group>
      </Navbar>
    )
  }
}

export default props => {
  return (
      <Subscribe to={[AuthContainer]}>
          {(a) => <Navbaroo auth={a} />}
      </Subscribe>
  )
}