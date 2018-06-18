// in the form component
// write code compatible to redux-form
// use validators (write validation module and import)
// write and use a separate input module
import React from 'react';
// import Field, SubmissionError, focus etc which are predefined in redux-form
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, noWhiteSpacePadding, minLength} from '../validators';

import './login-form.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        console.log(values);
        return fetch('/api/users/login', {
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
                        return res.json().then(err => Promise.reject(err));
                    }
                    // It's a less informative error returned by express
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
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
      //const values=getFormValues('loginForm');
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Log in successfully
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
            <form
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
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
                    validate={[required, nonEmpty, noWhiteSpacePadding, minLength]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Log In
                </button>
                <button
                    disabled={this.props.pristine || this.props.submitting}
                    onclick={e=>this.onSignup(e)}>
                    Sign Up
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('login', Object.keys(errors)[0]))
})(LoginForm);


