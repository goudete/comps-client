import React, { Component } from 'react';
import { Navbar, Heading, Button, Alignment, Icon } from "@blueprintjs/core";
import { Menu, MenuDivider, MenuItem, Popover, Position, } from "@blueprintjs/core"
import AuthContainer from '../../containers/AuthContainer';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';




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
            <Link to="/home">
              <span style={{ color: 'white'}}>clustr</span>
            </Link>
          </div>
        </Navbar.Group>
        
        <Navbar.Group align={Alignment.RIGHT}>
          <div className="userName">
            <Link to="/profile"> 
              <span style={{ marginRight: '1em' }}><Icon icon={'person'} /></span>
            </Link>
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