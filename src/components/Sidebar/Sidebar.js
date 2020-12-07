import React, { Component, Fragment } from 'react';
import { Icon } from '@blueprintjs/core';
import Map from '../Map/Map';
import { Subscribe } from 'unstated';
import AuthContainer from '../../containers/AuthContainer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './Sidebar.css'

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: 'home' 
        }
       
    }

    render() {
        return (
            <div className="leftColumn">
                <div className="sideBarItemWrapper">
                    <div
                        className="sidebarItem"
                        onClick={() => {this.setState({ selected: 'home'})}}
                    >
                       <Link to="/home">
                            <span className={`icon ${this.state.selected === 'home' && ' active'}`}>
                                <Icon icon="home" iconSize={32} />
                            </span>
                            &nbsp;&nbsp;{' '}
                            <span className={`sidebarItemText ${this.state.selected === 'home' && ' active'}`}>
                                <b>Home</b>{' '}
                            </span>{' '}
                        </Link>
                    </div>
                    <div
                        className="sidebarItem"
                        onClick={() => {this.setState({ selected: 'lists'})}}
                    >
                        <Link to="/friends">
                            <span className={`icon ${this.state.selected === 'lists' && ' active'}`}>
                                <Icon icon="people" iconSize={32} />
                            </span>
                            &nbsp;&nbsp;{' '}
                            <span className={`sidebarItemText ${this.state.selected === 'lists' && ' active'}`}>
                                <b>Friends</b>{' '}
                            </span>
                        </Link>
                    </div>
                    <div
                        className="sidebarItem"
                        onClick={() => {this.setState({ selected: 'explore'})}}
                    >
                        <Link to="/explore">
                            <span className={`icon ${this.state.selected === 'explore' && ' active'}`}>
                                <Icon icon="path-search" iconSize={32}/>
                            </span>
                            &nbsp;&nbsp;{' '}
                            <span className={`sidebarItemText ${this.state.selected === 'explore' && ' active'}`}>
                                <b>Explore</b>{' '}
                            </span>
                        </Link>
                    </div>
                    <div
                        className="sidebarItem"
                        onClick={() => {this.setState({ selected: 'profile'})}}
                    >
                        <Link to="/profile">
                            <span className={`icon ${this.state.selected === 'profile' && ' active'}`}>
                                <Icon icon="person" iconSize={32} />
                            </span>
                            &nbsp;&nbsp;{' '}
                            <span className={`sidebarItemText ${this.state.selected === 'profile' && ' active'}`}>
                                <b>Profile</b>{' '}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
          
            


        )
    }
}

export default props => {
    return (
      <Subscribe to={[AuthContainer]}>
        {(a) => <Sidebar auth = {a}/>}
      </Subscribe>
    )
  }