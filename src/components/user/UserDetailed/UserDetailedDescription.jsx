import React from 'react';
import {
  Grid,
  Header,
  Item,
  List,
  Segment,
  Container
} from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid stackable columns={2}>
          <Grid.Column width={10}>
            <Header
              as="h4"
              icon="user"
              content={`About ${profile.displayName}`}
            />

            <Container>
              <p>
                I am a <strong>{profile.occupation || '-to be named-'}</strong>
              </p>
              <p>
                Originally from{' '}
                <strong>{profile.origin || '-to be named-'}</strong>
              </p>
              <p>
                Member Since: <strong>{createdAt}</strong>
              </p>
              <p>{profile.about}</p>
            </Container>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h5" icon="heart" content="Interests" />
            <Container>
              {profile.interests ? (
                <List style={{ paddingLeft: '40px' }}>
                  {profile.interests &&
                    profile.interests.map((interest, index) => (
                      <Item key={index} content={interest} />
                    ))}
                </List>
              ) : (
                <p>No interests</p>
              )}
            </Container>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
