import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
		if (sessionStorage.getItem('jwtToken') != null) {
		  fetch(window.location.protocol + '//' + window.location.hostname + ':3210/api/checkToken', {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': sessionStorage.getItem('jwtToken')
			}
		  })
			.then(res => {
			  if (res.status === 200) {
				this.setState({ loading: false });
			  } else {
				const error = new Error(JSON.stringify(res));
				throw error;
			  }
			})
			.catch(err => {
			  this.setState({ loading: false, redirect: true });
			});
		} else {
			this.setState({ loading: false, redirect: true });
		}
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}