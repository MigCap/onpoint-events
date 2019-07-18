import React from 'react';
import {
  Header,
  Segment,
  Feed,
  Sticky,
  Responsive,
  Accordion,
  Icon
} from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({
  activities,
  contextRef,
  accordionIndex,
  handleAccordionClick
}) => {
  return (
    <div style={{ zIndex: '10 !important' }}>
      <Responsive {...Responsive.onlyMobile}>
        <Accordion>
          <Accordion.Title
            active={accordionIndex === 0}
            index={0}
            onClick={handleAccordionClick}>
            <Header as="h1" attached="top" color="teal">
              <Icon name="dropdown" color="teal" />
              Recent Activity
            </Header>
          </Accordion.Title>
          <Accordion.Content active={accordionIndex === 0}>
            <Segment attached>
              <Feed>
                {activities &&
                  activities.map(activity => (
                    <EventActivityItem key={activity.id} activity={activity} />
                  ))}
              </Feed>
            </Segment>
          </Accordion.Content>
        </Accordion>
      </Responsive>

      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Sticky context={contextRef} offset={100} active={false}>
          <Header attached="top" content="Recent Activity" />
          <Segment attached>
            <Feed>
              {activities &&
                activities.map(activity => (
                  <EventActivityItem key={activity.id} activity={activity} />
                ))}
            </Feed>
          </Segment>
        </Sticky>
      </Responsive>
    </div>
  );
};

export default EventActivity;
