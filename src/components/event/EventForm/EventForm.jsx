/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/tools/form/TextInput';
import TextArea from '../../../app/tools/form/TextArea';
import SelectInput from '../../../app/tools/form/SelectInput';
import DateInput from '../../../app/tools/form/DateInput';
import PlaceInput from '../../../app/tools/form/PlaceInput';

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event: event,
    loading: state.async.loading
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: true
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue);
      });
  };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push('/events');
    }
  };

  render() {
    const {
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props;
    return (
      <div className="event-form">
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={14} widescreen={14}>
            <Segment>
              <Header as="h2" disabled>
                Add your Event
              </Header>
              <Header sub color="teal" content="Event Details" />
              <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field
                  name="title"
                  type="text"
                  component={TextInput}
                  placeholder="Give your event a name"
                />
                <Field
                  name="category"
                  type="text"
                  component={SelectInput}
                  options={category}
                  placeholder="What is your event about"
                />
                <Field
                  name="description"
                  type="text"
                  component={TextArea}
                  rows={3}
                  placeholder="Tell us about your event"
                />
                <Header sub color="teal" content="Event Location details" />
                <Field
                  name="city"
                  type="text"
                  component={PlaceInput}
                  options={{ types: ['(cities)'] }}
                  placeholder="Event city"
                  onSelect={this.handleCitySelect}
                />
                {this.state.scriptLoaded && (
                  <Field
                    name="venue"
                    type="text"
                    component={PlaceInput}
                    options={{
                      location: new google.maps.LatLng(this.state.cityLatLng),
                      radius: 1000,
                      types: ['establishment']
                    }}
                    placeholder="Event venue"
                    onSelect={this.handleVenueSelect}
                  />
                )}
                <Field
                  name="date"
                  type="text"
                  component={DateInput}
                  dateFormat="YYYY-MM-DD HH:mm"
                  timeFormat="HH:mm"
                  showTimeSelect
                  placeholder="Date and time of event"
                />
                <Grid.Column>
                  <Grid.Row>
                    <Button.Group fluid>
                      <Button
                        type="button"
                        disabled={loading}
                        onClick={this.props.history.goBack}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button
                        type="submit"
                        disabled={invalid || submitting || pristine}
                        loading={loading}
                        positive>
                        Submit
                      </Button>
                    </Button.Group>
                  </Grid.Row>
                  <br />
                  <Grid.Row>
                    {event.id && (
                      <Button
                        fluid
                        onClick={() => cancelToggle(!event.cancelled, event.id)}
                        type="button"
                        color={event.cancelled ? 'green' : 'red'}
                        content={
                          event.cancelled ? 'Reactivate Event' : 'Cancel Event'
                        }
                      />
                    )}
                  </Grid.Row>
                </Grid.Column>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
);
