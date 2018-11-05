import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
            <img src="assets/baseline_bubble_chart_white_18dp.png" alt="logo" />
            OnPoint Events
          </Menu.Item>
          <Menu.Item name="Events" />
          <Menu.Item>
            <Button floated="right" color='yellow' inverted content="Create Event" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button basic inverted content="Login" />
            <Button
              basic
              inverted
              content="Sign Out"
              style={{ marginLeft: '0.5em' }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
