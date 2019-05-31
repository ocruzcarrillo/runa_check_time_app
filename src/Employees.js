import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import RunaMenu from './RunaMenu'
import EmployeeInfo from './EmployeeInfo'
import EditingEmployeeTypeInfo from './EditingEmployeeTypeInfo';

export default class Employees extends Component {
  constructor(props) {
    super(props);
	this.state = {
			employees: [ ],
		}
  }

  componentDidMount() {
	  const adminSession = sessionStorage.getItem('adminSession');
	  const id_employee = sessionStorage.getItem('id_employee');
	  fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/employee/' + (adminSession == 'true' ? '' : id_employee), {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': sessionStorage.getItem('jwtToken')
			}
		  })
		  .then(res => res.json())
		  .then(res => {			 
			  // Assign the Data
			  this.setState({ employees: res.rows});
		  });
  }
 
  render() {
	  return(
		<div>
			<AppBar position="static">
				<Toolbar style={{ backgroundColor: '#fff' }}>
					<Typography color="textSecondary" style={{width: '100%'}}>
						<RunaMenu />
					</Typography>
				</Toolbar>
			</AppBar>
			<h2>Employees</h2>
			<EmployeeInfo employees={this.state.employees} handleClick={this.handleClick}/>
			
			<h2>Type Info</h2>
			<EditingEmployeeTypeInfo/>
		</div>
	  )
  }
}

