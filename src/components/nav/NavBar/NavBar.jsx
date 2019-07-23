import React, { Component, Fragment } from 'react';
import { withRouter, Link, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Responsive, Container, Grid } from 'semantic-ui-react';
import NavBarMobile from './NavBarMobile';
import TopBarMobile from './TopBarMobile';
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
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/events');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
        <Responsive {...Responsive.onlyMobile}>
          <Container>
            <Grid>
              <Grid.Row>
                <TopBarMobile
                  auth={auth}
                  profile={profile}
                  signIn={this.handleSignIn}
                  signOut={this.handleSignOut}
                  register={this.handleRegister}
                  authenticated={authenticated}
                />
              </Grid.Row>
            </Grid>
          </Container>
          <NavBarMobile
            auth={auth}
            profile={profile}
            signIn={this.handleSignIn}
            signOut={this.handleSignOut}
            register={this.handleRegister}
            authenticated={authenticated}
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
