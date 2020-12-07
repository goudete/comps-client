import { Container } from 'unstated';
import Cookies from 'js-cookie'
import axios from 'axios';


class AuthContainer extends Container {
    state = {
        token: Cookies.get("token") || '',
        username: Cookies.get("username") || '',
        user_id: Cookies.get("user_id") || '',
        allUsers: [],
        followerInfo: []
    }

    async handleSignup(email, username, password) {
        fetch('users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
            })
        })
      .then(res => res.json())
      .then(json => {
        this.setState({
          token: json.token,
          username: json.username,
          user_id: json.user_id
        });
        Cookies.set("token", json.token)
        Cookies.set("username", json.username)
        Cookies.set("user_id", json.user_id)
      });
    }
    async handleLogin(username, password) {
        fetch('login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
        })
          .then(res => res.json())
          .then(json => {
            this.setState({
              token: json.token,
              username: json.username,
              user_id: json.user_id
            })
            Cookies.set("token", json.token)
            Cookies.set("username", json.username)
            Cookies.set("user_id", json.user_id)
            
          });
    }
    async getAllUsers() {
      axios.get(`/users/`)
          .then(res => {
          const data = res.data;
          this.setState({ allUsers: data });
          })

    }
    async getFollowerInfo() {
      axios.get(`/follow/`, {
          params:
      {
        'user_id': Cookies.get("user_id")
      }
      })
          .then(res => {
          const data = res.data;
          this.setState({ followerInfo: data });
          })
    }
    checkAuth() {
      if(this.state.username && this.state.userame != '') {
        return true
      } else {
        return false
      }
    }
    logout() {
        this.setState({
            token: '',
            username: '',
            user_id: ''
        })
        Cookies.remove("token")
        Cookies.remove("username")
        Cookies.remove("user_id")
    }
}

export default AuthContainer