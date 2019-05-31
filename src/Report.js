import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import RunaMenu from './RunaMenu'
import CheckTimeTable from './CheckTimeTable'

export default class Report extends Component {
  constructor(props) {
    super(props)
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
			<h2>Report</h2>
			<CheckTimeTable/>
		</div>
	  )
  }
}

