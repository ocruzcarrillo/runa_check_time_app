import React, { Component } from 'react';
import LoginForm from './LoginForm'
// import widgetLoginForm from './ducks/widgetLoginForm'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/employee/login', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
		var _text = res.text();
      if (res.status === 200) {		
		_text.then(res => {
			var _res = JSON.parse(res);
			console.log(_res);
			sessionStorage.setItem('jwtToken', _res.token);
			sessionStorage.setItem('userSession', JSON.stringify(_res));
		 	sessionStorage.setItem('adminSession', _res.administrator);
			sessionStorage.setItem('id_employee', _res.id_employee);
		});
		
		this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again: ' + err);
    });
  }

  render() {
    return (
		<LoginForm onSubmit={this.onSubmit} handleInputChange={this.handleInputChange}/>
    );
  }
}

