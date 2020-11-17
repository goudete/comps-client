import { Container } from 'unstated';


class AuthContainer extends Container {
    state = {
        logged_in: localStorage.getItem('token') ? true : false,
        username: ''
    }

    async handleSignup(email, username, password) {
        // e.preventDefault();
        fetch('http://localhost:8000/users/', {
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
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          username: json.username
        });
      });
    }
    async handleLogin(username, password) {
        fetch('http://localhost:8000/token-auth/', {
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
            if(json.token){
                localStorage.setItem('token', json.token);
                this.setState({
                logged_in: true,
                username: json.username
                });
            } else {
                this.setState({
                    logged_in: false,
                    username: '',
                })
            }
            
          });
    }
    // checkAuth() {
    //     const logged_in = localStorage.getItem('token') ? true : false
    //     if (logged_in) {
    //         fetch('http://localhost:8000/current_user/', {
    //             headers: {
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             }
    //             })
    //             .then(res => res.json())
    //             .then(json => {
    //                 if (json.username) {
    //                     console.log(json)
    //                     this.setState({ username: json.username });
    //                     return true
    //                 }
    //             });
    //     } else {
    //         return false
    //     }
    // }
    logout() {
        localStorage.removeItem('token');
        this.setState({
            logged_in: false,
            username: ''
        })
    }
}

export default AuthContainer