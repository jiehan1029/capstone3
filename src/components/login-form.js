import React from 'react';
import {connect} from 'react-redux';

import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
//import { getFormValues } from 'redux-form/immutable';
import Input from './input';
import {required, nonEmpty, noWhiteSpacePadding, minLength, maxLength} from '../validators';

import './login-form.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    //console.log(values);
    return fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (
            res.headers.has('content-type') &&
            res.headers
                .get('content-type')
                // str.startsWith() is a native JS method
                .startsWith('application/json')
          ) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => {
              console.log(err);
              Promise.reject(err);
            });
          }
          // It's a less informative error returned by express
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        //console.log(res);
        return;
      })
      .then(() => console.log('Submitted with values', values))
      .catch(err => {
        // this err is returned from server and contents customized by server side code
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
          // Convert ValidationErrors into SubmissionErrors for Redux Form
          return Promise.reject(
            // SubmissionError is predefined in redux-form module
            new SubmissionError({
                [location]: message
            })
          );
        }
        return Promise.reject(
          new SubmissionError({
              _error: 'Error submitting message'
          })
        );
      });
  }
  
  onSignup(e){
    e.preventDefault();
    const values=this.props.currentForm.values;
    return fetch('http://localhost:8080/api/users', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.headers.has('content-type') &&
            res.headers
                .get('content-type')
                .startsWith('application/json')  
          ) {
            // It's a nice JSON error returned by us, so decode it by console.log
            return res.json().then(err => {


              // WHY this error is not caught?????



              Promise.reject(err);
            });
          }
          // It's a less informative error returned by express
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return res.json();
      })
      .then(res=>{
        console.log('Registered a new user: ', res);

        // need to  redirect on server-side to login

      })
      .catch(err => {
        console.log("catch any error in promise chaining ",err);
        // this err is returned from server and contents customized by server side code
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
          // Convert ValidationErrors into SubmissionErrors for Redux Form
          return Promise.reject(
            // SubmissionError is predefined in redux-form module
            new SubmissionError({
                [location]: message
            })
          );
        }
        return Promise.reject(
          new SubmissionError({
              _error: 'Error submitting message'
          })
        );
      })
  }

  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className="message message-success">
            Create/access account successfully
        </div>
      );
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }

    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {successMessage}
        {errorMessage}
        <Field
          name="username"
          type="text"
          component={Input}
          label="Username"
          validate={[required, nonEmpty, noWhiteSpacePadding]}
        />
        <Field
          name="password"
          type="text"
          component={Input}
          label="Password"
          validate={[required, nonEmpty, noWhiteSpacePadding, minLength, maxLength]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Log In
        </button>
        <button
          disabled={this.props.pristine || this.props.submitting}
          onClick={e=>this.onSignup(e)}>
          Sign Up
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
    currentForm:state.form.login
    });

LoginForm=connect(mapStateToProps)(LoginForm);

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);


