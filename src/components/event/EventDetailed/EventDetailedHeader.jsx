import React, { Fragment } from 'react';
import {
  Segment,
  Image,
  Item,
  Header,
  Button,
  Label,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const eventImageStyle = {
  filter: 'brightness(35%)',
  objectFit: 'cover',
  objectPosition: 'center -20px',
  height: '300px'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailedHeader = ({
  event,
  attendees,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
  loading,
  openModal,
  authenticated
}) => {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpeg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(eventDate, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <Fragment>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            )}

            {!isGoing && authenticated && !event.cancelled && (
              <Fragment>
                <Button as="div" labelPosition="right" fluid>
                  <Button color="teal" fluid>
                    <Icon name="hand point up" />
                    JOIN THIS EVENT
                  </Button>
                  <Label as="a" basic color="teal" pointing="left">
                    {attendees.length} going
                  </Label>
                </Button>
              </Fragment>
            )}

            {!authenticated && !event.cancelled && (
              <Button
                fluid
                loading={loading}
                onClick={() => openModal('UnauthModal')}
                color="teal">
                JOIN THIS EVENT
              </Button>
            )}

            {event.cancelled && !isHost && (
              <Label size="large" color="red" content="Event Cancelled" />
            )}
          </Fragment>
        )}
        {isHost && (
          <Button as={Link} to={`/manage/${event.id}`} color="orange" fluid>
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
