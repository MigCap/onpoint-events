import React, { Fragment } from 'react';
import {
  Card,
  Grid,
  Header,
  Image,
  Segment,
  Tab,
  Responsive,
  Container
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const panesMobile = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const UserDeteiledEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Fragment>
      <Grid.Column width={12}>
        <Responsive {...Responsive.onlyMobile}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Tab
              onTabChange={(e, data) => changeTab(e, data)}
              panes={panesMobile}
              menu={{ secondary: true, pointing: true }}
            />
            <br />

            <Tab.Pane loading={eventsLoading}>
              <Card.Group itemsPerRow={1}>
                {events &&
                  events.map(event => (
                    <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                      <Image
                        src={`/assets/categoryImages/${event.category}.jpeg`}
                      />
                      <Card.Content>
                        <Card.Header textAlign="center">
                          {event.title}
                        </Card.Header>
                        <Card.Meta textAlign="center">
                          <div>
                            {format(event.date.toDate(), 'DD MMM YYYY')}
                          </div>
                          <div>{format(event.date.toDate(), 'h:mm A')}</div>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  ))}
              </Card.Group>
            </Tab.Pane>
          </Segment>
        </Responsive>
      </Grid.Column>

      <Grid.Column width={12}>
        <Segment attached>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Header icon="calendar" content="Events" />
            <Tab
              onTabChange={(e, data) => changeTab(e, data)}
              panes={panes}
              menu={{ secondary: true, pointing: true }}
            />
            <br />

            <Tab.Pane loading={eventsLoading}>
              <Card.Group itemsPerRow={3}>
                {events &&
                  events.map(event => (
                    <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                      <Image
                        src={`/assets/categoryImages/${event.category}.jpeg`}
                      />
                      <Card.Content>
                        <Card.Header textAlign="center">
                          {event.title}
                        </Card.Header>
                        <Card.Meta textAlign="center">
                          <div>
                            {format(event.date.toDate(), 'DD MMM YYYY')}
                          </div>
                          <div>{format(event.date.toDate(), 'h:mm A')}</div>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  ))}
              </Card.Group>
            </Tab.Pane>
          </Responsive>
        </Segment>
      </Grid.Column>
    </Fragment>
  );
};

export default UserDeteiledEvents;
