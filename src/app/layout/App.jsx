import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../components/event/EventDashboard/EventDashboard';
import NavBar from '../../components/nav/NavBar/NavBar';
import EventForm from '../../components/event/EventForm/EventForm';
import SettingsDashboard from '../../components/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../components/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../components/user/PeopleDashboard/PeopleDashboard';
import EventDetailedPage from '../../components/event/EventDetailed/EventDetailedPage';
import HomePage from '../../components/home/HomePage';
import TestComponent from '../../components/testing/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createEvent" component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
