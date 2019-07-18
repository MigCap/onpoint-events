import React, { Component, Fragment } from 'react';
import { withRouter, Link, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Responsive, Container, Grid, Menu, Icon } from 'semantic-ui-react';
import NavBarMobile from './NavBarMobile';
import NavBarDesktop from './NavBarDesktop';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});
class NavBar extends Component {
  state = {
    activeItem: ''
  };

  componentDidMount() {
    let url = this.props.location.pathname;
    console.log(url);
    console.log(this.props);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
        <Responsive {...Responsive.onlyMobile}>
          <Container>
            <Grid>
              <Menu size="large" inverted widths={4}>
                <Menu.Item
                  as={Link}
                  to="/"
                  header
                  borderless
                  style={{ paddingTop: '30px' }}>
                  <img src="/assets/onpointEvents.png" alt="logo" />
                  OnPoint Events
                </Menu.Item>
                {/* <Menu.Item
                  as={Link}
                  to={`/profile/${auth.uid}`}
                  name="profile"
                  position="right">
                  <Icon name="user outline" color="teal" size="large" />
                </Menu.Item> */}
              </Menu>
            </Grid>
          </Container>
          <NavBarMobile
            auth={auth}
            profile={profile}
            signIn={this.handleSignIn}
            signOut={this.handleSignOut}
            register={this.handleRegister}
            authenticated={authenticated}
            activeItem={this.state.activeItem}
            handleItemClick={this.handleItemClick}
          />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop
            auth={auth}
            profile={profile}
            signIn={this.handleSignIn}
            signOut={this.handleSignOut}
            register={this.handleRegister}
            authenticated={authenticated}
          />
        </Responsive>
      </Fragment>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);

/* const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBarMobile extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top" stackable>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/onpointEvents.png" alt="logo" />
            OnPoint Events
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated && (
            <Menu.Item as={NavLink} to="/people" name="People" />
          )}

          {authenticated && (
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                color="yellow"
                inverted
                content="Create Event"
              />
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu
              auth={auth}
              profile={profile}
              signOut={this.handleSignOut}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBarMobile)
  )
); */
