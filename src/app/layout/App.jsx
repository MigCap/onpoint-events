import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../layout/LoadingComponent';
import { UserIsAuthenticated } from '../../components/auth/authWrapper';

const AsyncHomePage = Loadable({
  loader: () => import('../../components/home/HomePage'),
  loading: LoadingComponent
});
const AsyncEventDashboard = Loadable({
  loader: () => import('../../components/event/EventDashboard/EventDashboard'),
  loading: LoadingComponent
});
const AsyncNavBar = Loadable({
  loader: () => import('../../components/nav/NavBar/NavBar'),
  loading: LoadingComponent
});
const AsyncEventForm = Loadable({
  loader: () => import('../../components/event/EventForm/EventForm'),
  loading: LoadingComponent
});
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../components/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
});
const AsyncUserDetailedPage = Loadable({
  loader: () => import('../../components/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent
});
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../components/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
});
const AsyncEventDetailedPage = Loadable({
  loader: () =>
    import('../../components/event/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent
});
const AsyncModalManager = Loadable({
  loader: () => import('../../components/modals/ModalManager'),
  loading: LoadingComponent
});
const AsyncNotFound = Loadable({
  loader: () => import('../layout/NotFound'),
  loading: LoadingComponent
});
class App extends Component {
  render() {
    return (
      <Fragment>
        <AsyncModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <AsyncNavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={AsyncEventDashboard} />
                  <Route path="/event/:id" component={AsyncEventDetailedPage} />
                  <Route
                    path="/manage/:id"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(AsyncPeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(AsyncUserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(AsyncSettingsDashboard)}
                  />
                  <Route
                    path="/createEvent"
                    component={UserIsAuthenticated(AsyncEventForm)}
                  />
                  <Route path="/error" component={AsyncNotFound} />
                  <Route component={AsyncNotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
