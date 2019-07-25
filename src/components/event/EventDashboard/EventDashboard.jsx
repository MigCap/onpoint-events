import React, { Component, Fragment } from 'react';
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
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
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
    const { moreEvents, loadedEvents, accordionIndex } = this.state;

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
            <Grid>
              <Grid.Column mobile={16} tablet={16}>
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
            <Label>{activities !== undefined ? activities.length : '?'}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane attached={false}>
            <EventActivity
              activities={activities}
              contextRef={this.state.contextRef}
              accordionIndex={accordionIndex}
              handleAccordionClick={this.handleAccordionClick}
            />
          </Tab.Pane>
        )
      }
    ];

    const color = 'teal';

    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
    return (
      <Fragment>
        <Grid>
          <Responsive {...Responsive.onlyMobile}>
            <Tab
              panes={panes}
              menu={{ color, secondary: true, pointing: true }}
            />
          </Responsive>
        </Grid>

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Grid reversed="tablet">
            <Grid.Column tablet={16} computer={10} widescreen={10}>
              <div ref={this.handleContextRef}>
                <EventList
                  loading={this.state.loadingInitial}
                  moreEvents={moreEvents}
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                />
              </div>
            </Grid.Column>

            <Grid.Column tablet={16} computer={10} widescreen={10}>
              <EventActivity
                activities={activities}
                contextRef={this.state.contextRef}
                accordionIndex={accordionIndex}
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
      </Fragment>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashboard));
