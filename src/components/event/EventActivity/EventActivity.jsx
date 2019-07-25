import React from 'react';
import { Header, Segment, Feed, Sticky, Responsive } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities, contextRef }) => {
  return (
    <div style={{ zIndex: '10 !important' }}>
      <Responsive {...Responsive.onlyMobile}>
        <Segment attached>
          <Feed>
            {activities &&
              activities.map(activity => (
                <EventActivityItem key={activity.id} activity={activity} />
              ))}
          </Feed>
        </Segment>
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
