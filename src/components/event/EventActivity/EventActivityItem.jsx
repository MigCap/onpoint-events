import React, { Component, Fragment } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class EventActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <Fragment>
            New Event!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            is hosting <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </Fragment>
        );
      case 'cancelledEvent':
        return (
          <Fragment>
            Event Cancelled!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            has cancelled <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </Fragment>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;

    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src={activity.photoURL || '/assets/user.png'} alt="Activity" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
            <Feed.Meta>
              <Feed.Date>{distanceInWordsToNow(activity.timestamp.toDate())} ago</Feed.Date>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

export default EventActivityItem;
