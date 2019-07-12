import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/tools/form/TextInput';
import { registerUser, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  invalid,
  submitting,
  socialLogin
}) => {
  return (
    <Fragment>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <div style={{ marginBottom: '10px' }}>
              <Label basic color="red">
                {error}
              </Label>
            </div>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal">
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </Fragment>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
