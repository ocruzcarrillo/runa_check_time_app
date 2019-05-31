import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export default class Logout extends Component {
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
	console.log('handleLogout');
	sessionStorage.clear();
	window.location.reload();
  }

  render() {
	  return(<MenuItem onClick={this.handleLogout}>Logout</MenuItem>)
  }
}

