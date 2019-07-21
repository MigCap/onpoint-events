import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import format from 'date-fns/format';

class EventDetailedInfo extends Component {
  state = {
    showMap: false
  };

  componentWillUnmount() {
    this.setState({
      showMap: false
    });
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { event, openModal, authenticated } = this.props;
    let eventDate;
    if (event.date) {
      eventDate = event.date.toDate();
    }
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <Icon size="large" color="teal" name="info" />
              </Grid.Column>
              <Grid.Column width={14}>
                <p>{event.description}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={2}>
                <Icon name="calendar" size="large" color="teal" />
              </Grid.Column>
              <Grid.Column width={14}>
                <span>
                  {format(eventDate, 'dddd Do MMM')} at{' '}
                  {format(eventDate, 'h:mm A')}
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={2}>
                <Icon name="map marker alternate" size="large" color="teal" />
              </Grid.Column>
              <Grid.Column width={14}>
                <span>{event.venue}</span>
              </Grid.Column>
            </Grid.Row>

            <Grid.Column width={16}>
              {authenticated && (
                <Button
                  fluid
                  onClick={this.showMapToggle}
                  color="blue"
                  size="small"
                  content={this.state.showMap ? 'Hide Map' : 'Show Map'}
                />
              )}

              {!authenticated && (
                <Button
                  fluid
                  onClick={() => openModal('UnauthModal')}
                  color="blue"
                  size="small"
                  content="Show Map"
                />
              )}
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <EventDetailedMap
            lat={event.venueLatLng.lat}
            lng={event.venueLatLng.lng}
          />
        )}
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
