import React, { Component, Fragment } from 'react';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import Navbaroo from '../../components/Navbar/Navbar';
import axios from 'axios';
import { Icon } from '@blueprintjs/core'

import { Redirect } from 'react-router-dom';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';

import './Home.css'


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      places: [],
      selected: 'home'
    }
  }
  componentDidMount() {
    axios.get(`/places`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        const places = res.data;
        console.log('PLACES: ' + places)
        this.setState({ places });
      })
  }

  render() {
    // const isLoggedIn = this.props.auth.checkAuth()
    return (
      this.props.auth.state.logged_in ?
      (
        <Fragment>
          <div className="dualPane">
            <div className="leftColumn">
                <div className="sideBarItemWrapper">
                    <div
                    className="sidebarItem"
                    onClick={() => {this.setState({ selected: 'home'})}}
                    >
                        <span className={`icon ${this.state.selected === 'home' && ' active'}`}>
                            <Icon icon="home" iconSize={32} />
                        </span>
                        &nbsp;&nbsp;{' '}
                        <span className={`sidebarItemText ${this.state.selected === 'home' && ' active'}`}>
                            <b>Home</b>{' '}
                        </span>{' '}
                    </div>
                    <div
                    className="sidebarItem"
                    onClick={() => {this.setState({ selected: 'lists'})}}
                    >
                        <span className={`icon ${this.state.selected === 'lists' && ' active'}`}>
                            <Icon icon="document" iconSize={32} />
                        </span>
                        &nbsp;&nbsp;{' '}
                        <span className={`sidebarItemText ${this.state.selected === 'lists' && ' active'}`}>
                            <b>Lists</b>{' '}
                        </span>
                    </div>
                    <div
                    className="sidebarItem"
                    onClick={() => {this.setState({ selected: 'explore'})}}
                    >
                        <span className={`icon ${this.state.selected === 'explore' && ' active'}`}>
                            <Icon icon="path-search" iconSize={32}/>
                        </span>
                        &nbsp;&nbsp;{' '}
                        <span className={`sidebarItemText ${this.state.selected === 'explore' && ' active'}`}>
                            <b>Explore</b>{' '}
                        </span>
                    </div>
                    <div
                    className="sidebarItem"
                    onClick={() => {this.setState({ selected: 'profile'})}}
                    >
                        <span className={`icon ${this.state.selected === 'profile' && ' active'}`}>
                            <Icon icon="person" iconSize={32} />
                        </span>
                        &nbsp;&nbsp;{' '}
                        <span className={`sidebarItemText ${this.state.selected === 'profile' && ' active'}`}>
                            <b>Profile</b>{' '}
                        </span>
                    </div>
                </div>
            </div>
          
            <div className="HomeContainer">

              {this.state.selected === 'profile' ?
                (
                  <Map />
                ) :
                this.state.selected === 'lists' ?
                (
                  <h1>My lists</h1>

                ) :
                this.state.selected === 'explore' ?
                (
                  <Fragment>
                    <h2>Your personalized list:</h2>
                    <List
                      places={this.state.places}
                    />
                  </Fragment>
                ) :
                (
                  <h1>Home</h1>
                )
              }
              

                  

            </div>
          </div>
        </Fragment>
      )
      :
      (
        <Redirect to="/" />
      )
    );
  }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Home auth = {a}/>}
    </Subscribe>
  )
}
