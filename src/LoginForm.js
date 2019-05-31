import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logoRuna from './runa-logo.gif';
import Box from '@material-ui/core/Box';

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  const classes = useStyles();
  
  const renderTextField = ({
	  label,
	  input,
	  meta: { touched, invalid, error },
	  ...custom
	}) => (
	  <TextField
		variant="outlined"
		required
		fullWidth
		label={label}
		placeholder={label}
		error={touched && invalid}
		helperText={touched && error}
		autoComplete="current-{name}"
		{...input}
		{...custom}
	  />
	)
  
  return (
	<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
          <img src={logoRuna} alt="Logo Runa" />
        <h5>
          Check Time App
        </h5>
		<form onSubmit={handleSubmit} className={classes.form}>
		   <Grid container spacing={2}>
			<Grid item xs={12}>
			  <Field
				component={renderTextField}
				name="username"
				type="email"
				validate={email}
				label="Username in email format"
			  />
			</Grid>
		  </Grid>
		  <Grid container spacing={2}>
			<Grid item xs={12}>
			  <Field
				component={renderTextField}
				name="password"
				type="password"
				label="Password"
			  />
			</Grid>
			<Button 
				type="submit" 
				className="classes.submit"
				fullWidth
				variant="contained"
				color="primary">
			  Submit
			</Button>
			</Grid>
		</form>
	  </div>
	   <Box mt={5} variant="body2" color="textSecondary" align="center">
		   {'by ISC Omar Cruz Carrillo'}
      </Box>
	</Container>
  )
}

export default reduxForm({
  form: 'loginForm'  // a unique identifier for this form
})(LoginForm)