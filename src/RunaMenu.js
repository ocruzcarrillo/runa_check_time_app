import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logoRuna from './runa-logo.gif';
import { withRouter } from 'react-router'
import Logout from './Logout'
import Typography from '@material-ui/core/Typography'

class RunaMenu extends Component {
  state = { anchorEl: null };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
	const { location: { pathname } } = this.props;
    const { anchorEl } = this.state;
	const adminSession  = sessionStorage.getItem('adminSession');
	const userSession = JSON.parse(sessionStorage.getItem('userSession'));
	
	return (
		<div style={{ width: '100%'}}>
		  <img src={logoRuna} alt="Logo Runa" style={{ maxHeight: 25}}/>
		  {'Check Time App'} - 		  {userSession.username}
		  <Button
		    style={{float: 'right'}}
			aria-owns={anchorEl ? 'simple-menu' : undefined}
			aria-haspopup="true"
			onClick={this.handleClick}
		  >{adminSession == 'true' ? ' Administrator ' : ' Employee '} Menu 
		  </Button>		  
		  <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
			{adminSession == 'true' ?  <MenuItem selected={pathname === '/register'} onClick={this.handleClose} component={Link} to="/register">Check Time Register</MenuItem> : false}
			{adminSession == 'true' ?  <MenuItem selected={pathname === '/employee'} onClick={this.handleClose} component={Link} to="/employee">Employee Info</MenuItem> : false}
			<MenuItem selected={pathname === '/report'} onClick={this.handleClose} component={Link} to="/report">In/Out Report</MenuItem>
			<Logout {...this.props}/>
		  </Menu>
		</div>
	);
  }
}

export default withRouter(RunaMenu);
