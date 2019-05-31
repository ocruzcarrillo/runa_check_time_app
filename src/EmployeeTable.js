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

export default class EmployeeTable extends Component {
	constructor() {
		super();
		this.state = {
			columns: [],
			data: [ ],
			isRegister: true,
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
	
	isEditable = {
		onRowAdd: newData =>
		  new Promise(resolve => {
			setTimeout(() => {
			  resolve();
			  const data = [...this.state.data];
			  data.push(newData);
			  this.setState({ ...this.state, data });
			}, 600);
		  }),
		onRowUpdate: (newData, oldData) =>
		  new Promise(resolve => {
			setTimeout(() => {
			  resolve();
			  const data = [...this.state.data];
			  data[data.indexOf(oldData)] = newData;
			  this.setState({ ...this.state, data });
			}, 600);
		  }),
		onRowDelete: oldData =>
		  new Promise(resolve => {
			setTimeout(() => {
			  resolve();
			  const data = [...this.state.data];
			  data.splice(data.indexOf(oldData), 1);
			  this.setState({ ...this.state, data });
			}, 600);
		  }),
	  };
	  
	isRegister = [
		{
			icon: 'check',
			tooltip: 'Entry',
			onClick: (event, rowData) => {
				console.log(ENTRY);
				console.log(event, rowData);
				fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/checkTime/' + rowData.id_employee, {
					method: 'POST',
					body: JSON.stringify({
						id_type_check: ENTRY.id,
						date: new Date()
					}),
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': sessionStorage.getItem('jwtToken')
					}
				  })
				  .then(res => res.text())
				  .then(res => this.setState({message: res}));
			}
		},
		{
			icon: 'close',
			tooltip: 'Exit',
			onClick: (event, rowData) => {
				console.log(event, rowData);
				fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/checkTime/' + rowData.id_employee, {
					method: 'POST',
					body: JSON.stringify({
						id_type_check: EXIT.id,
						date: new Date()
					}),
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': sessionStorage.getItem('jwtToken')
					}
				  })
				  .then(res => res.text())
				  .then(res => this.setState({message: res}));
			}
		}
	];
	  
	componentDidMount() {
		fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/employee', {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': sessionStorage.getItem('jwtToken')
			}
		  })
		  .then(res => res.json())
		  .then(res => {			  
			  // Build Columns
			  if (this.state.columns.length == 0) {
				  var _columns = [];
				  Object.keys(res.rows[0]).map(key => {
					  console.log(key, res.rows[0][key]);
					  if (key != 'password_hash') {
						_columns.push({ 
							title: key, 
							field: key, 
							type: (
								(res.rows[0][key] == true || res.rows[0][key] == false) ? 'boolean' : 
									(/^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/.test(res.rows[0][key]) ? 'numeric' : 
										this.isValidDate(res.rows[0][key]) ? 'datetime' : 'string'
									)
							) 
						});
					  }
				  });
				  
				  this.setState({
					  columns: _columns
				  });
			  }
			  
			  // Assign the Data
			  this.setState({ data: res.rows});
		  });
	  }

	render() {
	  return (
		<MaterialTable
		  title="Register Check Time"
		  columns={this.state.columns}
		  data={this.state.data}
		  editable={this.state.isRegister ? null : this.isEditable}
		  actions={this.state.isRegister ? this.isRegister : null}
		  icons={tableIcons}
		/>
	  );
	}
}

