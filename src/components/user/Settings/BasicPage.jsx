import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DateInput from '../../../app/tools/form/DateInput';
import PlaceInput from '../../../app/tools/form/PlaceInput';
import TextInput from '../../../app/tools/form/TextInput';
import RadioInput from '../../../app/tools/form/RadioInput';

class BasicPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={16}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            {/* todo: Gender Radio button */}
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="other"
              label="Other"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            width={16}
            name="dateOfBirth"
            component={DateInput}
            dateFormat="YYYY-MM-DD"
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={moment().subtract(18, 'years')}
            placeholder="Date of Birth"
          />
          <Field
            width={16}
            name="city"
            placeholder="Home Town"
            options={{ types: ['(cities)'] }}
            label="Home Town"
            component={PlaceInput}
          />
          <Divider />
          <Button
            fluid
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(BasicPage);
