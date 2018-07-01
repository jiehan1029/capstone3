import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom';

import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

import { FormGroup, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="remainder" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <FormGroup>
        {error}
        <ControlLabel htmlFor="username">Username</ControlLabel>
        <Field
          component={Input}
          type="text"
          name="username"
          id="username"
          validate={[required, nonEmpty]}
        />
        <ControlLabel htmlFor="password">Password</ControlLabel>
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <Button type="submit" disabled={this.props.pristine || this.props.submitting}>Log in</Button>
        <Link to="/register" className='link'>Register</Link>
        <HelpBlock>For trial, use <strong>demoUser</strong> and <strong>demoPassword</strong></HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);