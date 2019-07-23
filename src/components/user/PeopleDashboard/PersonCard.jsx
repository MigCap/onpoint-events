import React from 'react';
import { Card, Image, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PersonCard = ({ user, loading }) => {
  return (
    <Card as={Link} to={`/profile/${user.id}`}>
      {loading ? (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      ) : (
        <Image src={user.photoURL || '/assets/user.png'} />
      )}

      {loading ? (
        <Placeholder>
          <Placeholder.Header />
          <Placeholder.Line length="medium" />
        </Placeholder>
      ) : (
        <Card.Content textAlign="center">
          <Card.Header content={user.displayName} />
          <Card.Meta textAlign="center">
            <span>{user.city}</span>
          </Card.Meta>
        </Card.Content>
      )}
    </Card>
  );
};

export default PersonCard;
