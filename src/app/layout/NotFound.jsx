import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header
              as="h1"
              textAlign="center"
              color="teal"
              style={{ paddingTop: '40%' }}>
              <Header.Content>Error 404 not found!</Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NotFound;
