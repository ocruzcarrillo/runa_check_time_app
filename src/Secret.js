import React, { Component } from 'react';

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/checkToken', {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': sessionStorage.getItem('jwtToken')
		}
	  })
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <div>
        <h1>Secret</h1>
		<p>{sessionStorage.getItem('jwtToken')}</p>
		<p>{sessionStorage.getItem('userSession')}</p>
		<p>{sessionStorage.getItem('adminSession')}</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}