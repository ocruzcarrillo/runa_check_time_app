import React, { Component } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Badge from '@material-ui/core/Badge';
const moment = require('moment')

const ENTRY = {name: 'Entry', id: '3f194e6e-cafc-4a77-a8b0-d2102c55cdd7'};
const EXIT = {name: 'Exit', id: '7da910aa-1c20-45fb-8587-be80563c8dee'};

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Close: Close,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

export default class CheckTimeTable extends Component {
	constructor() {
		super();
		this.state = {
			columns: [
				{title: 'id', field: 'id_employee'},
				{title: 'Employee', field: 'username'},
				{title: 'Date', field: 'date', type: 'datetime'},
				{title: 'Type Check', field: 'typeCheck'},
			],
			data: [ ],
			employees: [ ],
		}
	  }
	  
	isValidDate(str) {
	  var d = moment(str,'D/M/YYYY');
	  if(d == null || !d.isValid()) return false;

	  return str.indexOf(d.format('D/M/YYYY')) >= 0 
		  || str.indexOf(d.format('DD/MM/YYYY')) >= 0
		  || str.indexOf(d.format('D/M/YY')) >= 0 
		  || str.indexOf(d.format('DD/MM/YY')) >= 0;
	}
	  
	componentDidMount() {
		const userSession = JSON.parse(sessionStorage.getItem('userSession'));
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
			  this.setState({ employees: (Array.isArray(res.rows) ? res.rows: [res])});
		  });
		  
		fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/checkTime/' + (adminSession == 'true' ? '' : id_employee), {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': sessionStorage.getItem('jwtToken')
			}
		  })
		  .then(res => res.json())
		  .then(res => {
console.log(res);		
			  res.map(check => {
				  console.log(check);
				  check.date = new Date(check.date);
				  
				  console.log(this.state.employees);
				  
				  this.state.employees.map(employee => {
						if (employee.id_employee == check.id_employee) {
							check.username = employee.username;
						}
					});
					
					check.typeCheck = check.id_type_check == ENTRY.id ? ENTRY.name : EXIT.name;
			  }); 
			  // Assign the Data
			  this.setState({ data: res});
		  });
	  }

	render() {
	  return (
		<MaterialTable
		  title="Check Time Report"
		  columns={this.state.columns}
		  data={this.state.data}
		  icons={tableIcons}
		/>
	  );
	}
}

