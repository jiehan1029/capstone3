import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';

import { FormGroup, ControlLabel, Button } from 'react-bootstrap';

import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 4, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const {username, password} = values;
    const user = {username, password};
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
      )}>
        <FormGroup>
        <ControlLabel htmlFor="username">Username</ControlLabel>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <ControlLabel htmlFor="password">Password</ControlLabel>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <ControlLabel htmlFor="passwordConfirm">Confirm password</ControlLabel>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <Button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Register
        </Button>
      </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);