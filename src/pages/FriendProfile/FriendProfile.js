import React, { Component, Fragment } from 'react';
import axios from 'axios';
import AuthContainer from '../../containers/AuthContainer';
import { Subscribe } from 'unstated';
import { Redirect } from 'react-router-dom';
import { Drawer, Button, Dialog, InputGroup, TextArea, MenuItem, Popover, Menu, Position, Tag, Card, Elevation } from "@blueprintjs/core";
import PlacesContainer from '../../containers/PlacesContainer';
import Navbaroo from '../../components/Navbar/Navbar'


import '../../global.css';


class FriendProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          follow_data: [],
          newList: false,
          selectedPlaces: [],
          listName: '',
          description: '',
          toggleDrawer: false,
          selectedListItems: []
        }

        this.submitForm = this.submitForm.bind(this);
        this.clickCard = this.clickCard.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const arr = window.location.href.split('/')
        console.log('HEELLLOOO')
        const slug = arr[arr.length-1].split('?')[0]
        console.log('SLUG: ' + slug)
    //   axios.get(`/follow/`, 
    //   { 
    //     params:
    //     {
    //         // change this to friend's id
    //       'user_id': this.props.auth.state.user_id
    //     }
    //   },
    //   {
    //     headers: {
    //       'Authorization': `Token ${this.props.auth.state.token}`
    //     }
    //   })
    //     .then(res => {
    //       const data = res.data;
    //       this.setState({ follow_data: data });
    //     })

      this.props.places.getLists()
    }

    submitForm() {
      console.log('submit new prof')
        axios.post(`/list/`, {
            name: this.state.listName,
            description: this.state.description,
            places: this.state.selectedPlaces.map((p) => p.name),
            user_id: this.props.auth.state.user_id
        })
        .then(res => {
          console.log(res)
        
        })
        .catch(function (error) {
          console.log(JSON.stringify(error))
        })
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

    render() {
      const placesMenu = (
        <Menu>
            {this.props.places.state.allPlaces && this.props.places.state.allPlaces.map((p) => {
                return <MenuItem text = {p.name} onClick={() => {
                  this.setState({ selectedPlaces: this.state.selectedPlaces.concat(p) })
                }} />
              }
            )}
        </Menu>
      );
      const logged_in = this.props.auth.checkAuth();
        return (
          logged_in ?
          (
            <Fragment>
              <Navbaroo />
            <div className="mainContent" style={{ marginTop: '4em'}}>
              <h1>Hello {this.props.auth.state.username && this.props.auth.state.username}</h1>
              <h3>{this.state.follow_data && this.state.follow_data.follower_count} Followers</h3>
              <h3>{this.state.follow_data && this.state.follow_data.following_count} Following</h3>

              <Button
                onClick={() => this.setState({ newList: !this.state.newList})}
              >
                Create New List
              </Button>

              <Dialog
                isOpen={this.state.newList}
                onClose={() => this.setState({ newList: false })}
                className="newListModal"
                title="New List"
              >
                <div className="listForm"> 
                  <InputGroup
                    placeholder="List name"
                    onChange={(e) => this.setState({ listName: e.target.value })}
                    value={this.state.listName}
                    style={{ marginTop: '1em'}}
                    type='text'
                  />

                  <InputGroup
                    placeholder="Description"
                    onChange={(e) => this.setState({ description: e.target.value })}
                    value={this.state.description}
                    style={{ marginTop: '1em'}}
                    type='text'
                  />

                  <div className="tagsWrapper">
                    {
                      this.state.selectedPlaces.map((p) => {
                        return (
                        <Tag
                          className="tag"
                          style={{ maxWidth: '8em', margin: '.5em'}}
                        >
                          {p.name}
                        </Tag>
                        )
                      })
                    }
                  </div>
                </div>
                <Popover content={placesMenu} position={Position.BOTTOM}>
                  <Button text="Available Places" style={{ textAlign: 'center'}} />
                </Popover>

                <Button onClick={() => this.submitForm()}>
                    Create
                </Button>

              </Dialog>


              <h3 style={{ marginTop: '2em'}}>My Lists:</h3>
              {
                // call getLists but with friend id
                this.props.places.state.allLists && 
                this.props.places.state.allLists.map((l) => {
                  return (
                    <Card elevation={Elevation.TWO} onClick={() => this.clickCard(l.place)} style={{marginTop: '1em'}}>
                      <h2>{l.name}</h2>
                      <h5>{l.description}</h5>
                    </Card>
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
          </Fragment> 
          ) :
          (<Redirect to = "/login" />)
        );
    }
}

export default props => {
  return (
    <Subscribe to={[AuthContainer, PlacesContainer]}>
      {(a, p) => <FriendProfile auth = {a} places = {p} />}
    </Subscribe>
  )
}

