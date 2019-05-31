import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Check, Close, Person, VerifiedUser } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const EmployeeInfo = props => {
	const { employees	} = props
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
  const handleClick = (e) => {
    console.log(e);

  };

  return (
    <List dense>
      {employees.map(value => (
        <ListItem key={value} button onClick={handleClick.bind(this, value.id_employee)} component={Link} to={`/employee/${value.id_employee}`}>
		  <ListItemText>{value.id_employee}</ListItemText>
		  <ListItemText>{value.administrator}</ListItemText>
          <ListItemText primary={value.username} />
		  <ListItemIcon title='Active'>
			{value.active ? <Check /> : <Close/> }
          </ListItemIcon>
		  <ListItemIcon title='Administrator'>
			{!value.administrator ? <Person/> : <VerifiedUser/> }
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
}

export default EmployeeInfo;