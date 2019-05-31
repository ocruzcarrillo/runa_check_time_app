import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import RunaMenu from './RunaMenu';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class EmployeeEditInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
		value: 0
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    
  }
  
  handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    this.state.setValue(newValue);
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
      </div>
    );
  }
}

