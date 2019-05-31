import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import RunaMenu from './RunaMenu'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }
  
  componentDidMount() {
	  console.log(this.state);
    fetch(window.location.protocol + '//' + window.location.hostname + ':3210/')
      .then(res => res.json())
      .then(res => this.setState({message: res.info}));
  }
  
  render() {
    return (
      <div>
		<AppBar position="static">
            <Toolbar style={{ backgroundColor: '#fff' }}>
                <Typography color="textSecondary" style={{width: '100%'}}>
					<RunaMenu />
                </Typography>
            </Toolbar>
        </AppBar>
        <p>Connect to: {this.state.message}</p>
      </div>
    );
  }
}