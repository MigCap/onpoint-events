import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { openModal } from 'components/modals/modalActions';

import { Button } from 'semantic-ui-react';

class HomePage extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  render() {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              style={{ fill: '#00b5ad', paddingRight: '0px' }}>
              <path fill="none" d="M0 0h24v24H0z" />
              <circle cx="7.2" cy="14.4" r="3.2" />
              <circle cx="14.8" cy="18" r="2" />
              <circle cx="15.2" cy="8.8" r="4.8" />
            </svg>
            <div className="content">OnPoint Events</div>
          </h1>
          <h2>Get on with your events.</h2>
          <br />
          <br />
          <Button
              onClick={() => this.props.history.push('/events')}
              color='teal'
              size='big'
              fluid
              style={{marginBottom: '2rem'}}
            >Get Started</Button>
          <Button.Group
            fluid
            size='big'
            widths='8'
            style={{marginBottom: '2rem'}}>
            <Button
              onClick={this.handleSignIn}
              color='teal'
            >Login</Button>
            <Button.Or />
            <Button
              onClick={this.handleRegister}
              inverted
            >Register</Button>
          </Button.Group>
        </div>
      </div>
    );
  }
};

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(HomePage)
  )
);
