import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Register from './Register';
import Employees from './Employees';
import Report from './Report';
import EmployeeEditInfo from './EmployeeEditInfo';

import './App.css';
import { connect } from "react-redux";

class App extends Component {
	render() {
	  return (
		  <div>
			<Switch>
			  <Route path="/" exact component={withAuth(Home)} />
			  <Route path="/login" component={Login} />
			  <Route path="/secret" component={Secret} />
			  <Route path="/register" component={withAuth(Register)} />
			  <Route path="/employee/:id" component={withAuth(EmployeeEditInfo)} />
			  <Route path="/employee" component={withAuth(Employees)} />
			  <Route path="/report" component={withAuth(Report)} />
			</Switch>
		  </div>
	  );
	}
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);