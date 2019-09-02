
import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/hello/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(res => res.json())
          .then(json => {
            if (json === true) {
              this.setState({username: 'user'})
            }

          })

    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.access);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: 'user'
          });
        });
  };


  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    return (
        <div className="App">
          <Nav
              logged_in={this.state.logged_in}
              display_form={this.display_form}
              handle_logout={this.handle_logout}
          />
          {this.state.logged_in? '': <LoginForm handle_login={this.handle_login} />}

          <h3>
            {this.state.logged_in
                ? `Hello, you are logged in`
                : ''}
          </h3>
        </div>
    );
  }
}

export default App;