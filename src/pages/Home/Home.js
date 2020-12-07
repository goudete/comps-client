import React, { Component, Fragment } from 'react';
import Map from '../../components/Map/Map';
import axios from 'axios';
import { Icon, Card, Elevation, Drawer } from '@blueprintjs/core'
import Navbaroo from '../../components/Navbar/Navbar'
import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';
import PlacesContainer from '../../containers/PlacesContainer';


//import './Home.css'
import '../../global.css';


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      toggleDrawer: false,
      selectedListItems: []
    }
    this.clickCard = this.clickCard.bind(this);
    this.toggle = this.toggle.bind(this);
    this.findUsername = this.findUsername.bind(this);
  }
  
  componentDidMount() {
    this.props.auth.getAllUsers()
    this.props.places.getPlaces()
    this.props.places.getAllLists()

  }

  clickCard(places) {
    console.log('PLACES: ' + places)
    // loop through places, find the matching place in allPlaces.id, return that object
    let items = this.props.places.state.allPlaces.filter(obj => places.includes(obj.id))
    console.log(items)
    this.setState({
      toggleDrawer: true,
      selectedListItems: items
    })
  }
  toggle() {
    this.setState({
      toggleDrawer: null
    })
  }
  findUsername(l) {

    let user = this.props.auth.state.allUsers.find(obj => {return obj.id === l.user})
    console.log(user)
    if(user) {
      return user.username
    }
  }

  render() {
    const logged_in = this.props.auth.checkAuth();
    return (
      logged_in ?
      (
      <Fragment>
        <Navbaroo />
        <div className="mainContent" style={{ marginTop: '4em'}}>
          <div style={{ marginTop: '1em' }}>
            {
                  this.props.places.state.allUserLists && 
                  this.props.places.state.allUserLists.map((l) => {

                    return (
                      <div className="flexItem">
                        <Card elevation={Elevation.TWO} onClick={() => this.clickCard(l.place)} style={{marginTop: '1.5em'}}>
                          <h2>{l.name}</h2>
                          <h5>{l.description}</h5>
                          
                          <h6>By: {this.findUsername(l)}</h6>

                        </Card>
                      </div>
                    )
                  })
                }
          <Drawer
            isOpen={this.state.toggleDrawer}
            onClose={this.toggle}
          >
          
            <div className="drawerContainer">
                <div style={{ paddingLeft: '2em', paddingTop: '1.5em'}}>
                  <h1>Places in List:</h1>
                </div>
                
                {
                  this.state.selectedListItems &&
                    this.state.selectedListItems.map((obj) => {
                      return (
                        <div style={{ marginTop: '2em', paddingLeft: '2em'}}>
                          <h3>{obj.name}</h3>
                          <h6>{obj.address}</h6>
                          <h6>{obj.instagram}</h6>
                        </div>
                      )
                    })
                }
            </div>
          
          </Drawer>
          </div>
        </div>
      </Fragment>
      ) :
      (<Redirect to = "/login" />)

    );
  }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer, PlacesContainer]}>
      {(a, p) => <Home auth = {a} places = {p} />}
    </Subscribe>
  )
}
