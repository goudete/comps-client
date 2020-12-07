import React, { Component, Fragment } from 'react';
import AuthContainer from '../../containers/AuthContainer';
import { Subscribe } from 'unstated';
import Navbaroo from '../../components/Navbar/Navbar'
import { Icon, Card, Elevation, Button, Tag } from '@blueprintjs/core'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';


import '../../global.css';


class Friends extends Component {
    constructor(props){
        super(props)

        this.follow = this.follow.bind(this);
        this.visitFriend = this.visitFriend.bind(this);
    }
    componentDidMount() {
        this.props.auth.getAllUsers()
        this.props.auth.getFollowerInfo()
    }

    follow(followee) {
        console.log('FOLLOWEE: ' + followee)
        axios.post(`/follow/`, {
            'user_id': this.props.auth.state.user_id,
            'other_user_id': followee,
        })
          .then(res => {
            console.log(res)
          })
    }
    visitFriend(friend) {
        console.log(friend)
        return <Link to="/friendProfile"></Link>

    }

    render() {
        return (
            <Fragment>
                <Navbaroo />
                <div className="mainContent" style={{ marginTop: '4em'}}>
                    <h1>Users: </h1>
                    <div style={{ marginTop: '1em' }}>
                        {
                        this.props.auth.state.allUsers && 
                        this.props.auth.state.allUsers.map((u) => {
                            return (
                            <div>
                                <Card elevation={Elevation.TWO} style={{marginTop: '1.5em'}}>
                                    <h2>{u.username}</h2>
                                    {this.props.auth.state.followerInfo.following &&
                                        this.props.auth.state.followerInfo.following.find((obj) => obj.user_id === u.id) ?
                                        (
                                            <Tag>
                                                Following
                                            </Tag>
                                            
                                        ) :
                                        (
                                            <Button onClick={() => this.follow(u.id)}>
                                                Follow
                                            </Button>
                                        )

                                    }
                                    {/* <Link to="/friendProfile">
                                    <Button>
                                        Visit Profile
                                    </Button>
                                    </Link> */}
                                </Card>
                            </div>
                            )
                        })
                        }
                    </div>   
                </div>
            </Fragment>

        )
    }
}

export default props => {
    return (
      <Subscribe to={[AuthContainer]}>
        {(a) => <Friends auth = {a}/>}
      </Subscribe>
    )
  }