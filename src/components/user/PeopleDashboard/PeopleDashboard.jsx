import React, { Fragment } from 'react';
import { Grid, Segment, Header, Card, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PersonCard from './PersonCard';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers'
    }
  ];
};

const mapState = state => ({
  followings: state.firestore.ordered.following,
  followers: state.firestore.ordered.followers,
  auth: state.firebase.auth
});

const PeopleDashboard = ({ followings, followers }) => {
  let loading =
    followings &&
    followings === undefined &&
    (followers && followers === undefined);
  return (
    <Fragment>
      <Responsive {...Responsive.onlyMobile}>
        <Grid>
          <Grid.Column width={16}>
            <Segment>
              <Header as="h3" dividing content="People following me" />
              <Card.Group itemsPerRow={2}>
                {followers &&
                  followers.map(follower => (
                    <PersonCard
                      key={follower.id}
                      user={follower}
                      loading={loading}
                    />
                  ))}
              </Card.Group>
            </Segment>
            <Segment>
              <Header dividing content="People I'm following" />
              <Card.Group itemsPerRow={2}>
                {followers &&
                  followings.map(following => (
                    <PersonCard
                      key={following.id}
                      user={following}
                      loading={loading}
                    />
                  ))}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </Responsive>

      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Grid>
          <Grid.Column width={16}>
            <Segment>
              <Header as="h3" dividing content="People following me" />
              <Card.Group itemsPerRow={8}>
                {followers &&
                  followers.map(follower => (
                    <PersonCard
                      key={follower.id}
                      user={follower}
                      loading={loading}
                    />
                  ))}
              </Card.Group>
            </Segment>
            <Segment>
              <Header dividing content="People I'm following" />
              <Card.Group itemsPerRow={8}>
                {followers &&
                  followings.map(following => (
                    <PersonCard
                      key={following.id}
                      user={following}
                      loading={loading}
                    />
                  ))}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </Responsive>
    </Fragment>
  );
};

export default compose(
  connect(mapState),
  firestoreConnect(props => query(props))
)(PeopleDashboard);
