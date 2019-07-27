import React, { Component } from 'react';
import {
  Grid,
  Loader,
  Responsive,
  Tab,
  Menu,
  Label,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getEventsForDashboard } from '../eventActions';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 6
  }
];

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {},
    accordionIndex: 1
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
        loadedEvents: [...this.props.events]
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loadedEvents } = this.state;

    if (this.props.events !== nextProps.events) {
      const loadedEventsIds = new Set(loadedEvents.map(({ id }) => id));
      const mergedEvents = [
        ...loadedEvents,
        ...nextProps.events.filter(({ id }) => !loadedEventsIds.has(id))
      ];

      this.setState({
        loadedEvents: [...mergedEvents]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { loading, activities } = this.props;
    const { moreEvents, loadedEvents } = this.state;

    const panes = [
      {
        menuItem: (
          <Menu.Item key="Events">
            <Icon name="calendar alternate outline" />
            Events
            <Label style={{ opacity: '0' }}>
              {activities !== undefined ? activities.length : '?'}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <div ref={this.handleContextRef}>
            <Grid style={{ minWidth: '100vw' }}>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={16}
                widescreen={10}>
                <EventList
                  loading={this.state.loadingInitial}
                  moreEvents={moreEvents}
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                />
              </Grid.Column>
            </Grid>
          </div>
        )
      },
      {
        menuItem: (
          <Menu.Item key="Events Activity">
            <Icon name="newspaper outline" />
            Events Activity
            <Label color="teal" size="mini" circular>
              {activities !== undefined ? activities.length : '?'}
            </Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane attached={false}>
            <EventActivity
              activities={activities}
              contextRef={this.state.contextRef}
              handleAccordionClick={this.handleAccordionClick}
            />
          </Tab.Pane>
        )
      }
    ];

    const color = 'teal';

    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
    return (
      <div className="events-list">
        <Grid>
          <Responsive {...Responsive.onlyMobile}>
            <Tab
              panes={panes}
              menu={{ color, secondary: true, pointing: true }}
            />
          </Responsive>
        </Grid>

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Grid centered>
            <Grid.Column mobile={16} tablet={10} computer={10} widescreen={10}>
              <div ref={this.handleContextRef}>
                <EventList
                  loading={this.state.loadingInitial}
                  moreEvents={moreEvents}
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                />
              </div>
            </Grid.Column>

            <Grid.Column mobile={16} tablet={6} computer={6} widescreen={6}>
              <EventActivity
                activities={activities}
                contextRef={this.state.contextRef}
                handleAccordionClick={this.handleAccordionClick}
              />
            </Grid.Column>

            {loading && (
              <Grid.Column width={10}>
                <Loader active={loading} />
              </Grid.Column>
            )}
          </Grid>
        </Responsive>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashboard));
