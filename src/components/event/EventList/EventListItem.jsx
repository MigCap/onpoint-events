import React, { Component } from "react";
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Responsive,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttendee from "./EventListAttendee";
import format from "date-fns/format";
import { objectToArray } from "../../../app/tools/util/helpers";

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Responsive {...Responsive.onlyMobile}>
          <Segment>
            <Item.Group unstackable>
              <Item>
                <Item.Image size="tiny" rounded src={event.hostPhotoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as={Link} to={`/event/${event.id}`}>
                    {event.title}
                  </Item.Header>
                  <Item.Description>
                    Hosted by{" "}
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hostedBy}
                    </Link>
                  </Item.Description>
                  {event.cancelled && (
                    <Label
                      style={{ top: "-40px" }}
                      ribbon="right"
                      color="red"
                      content="This event has been cancelled"
                    />
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" circular src={event.hostPhotoURL} />

                <Item.Content verticalAlign="middle">
                  <Item.Header as={Link} to={`/event/${event.id}`}>
                    {event.title}
                  </Item.Header>
                  <Item.Description>
                    Hosted by{" "}
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hostedBy}
                    </Link>
                  </Item.Description>
                  {event.cancelled && (
                    <Label
                      style={{ top: "-40px" }}
                      ribbon="right"
                      color="red"
                      content="This event has been cancelled"
                    />
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Responsive>
        <Segment secondary>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), "dddd Do MMMM YYYY")}{" "}
            at {format(event.date.toDate(), "HH:mm")} |
          </span>
          <br />
          <span>
            <Icon name="map marker alternate" /> {event.venue}
          </span>
        </Segment>
        <Segment>
          <span style={{ paddingRight: "5px" }}>Attendees: </span>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{event.description}</Grid.Column>
              <Grid.Column width={6}>
                <Button
                  as={Link}
                  to={`/event/${event.id}`}
                  color="blue"
                  floated="right"
                  content="View"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
