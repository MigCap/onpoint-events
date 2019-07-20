import React, { Fragment } from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
  return (
    <Fragment>
      <Menu vertical fluid>
        <Header icon="user" attached inverted color="grey" content="Profile" />
        <Menu.Item as={NavLink} to="/settings/basic">
          Basics
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          About Me
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          My Photos
        </Menu.Item>
      </Menu>
      <Grid.Row />
      <Menu vertical fluid>
        <Header
          icon="settings"
          attached
          inverted
          color="grey"
          content="Account"
        />
        <Menu.Item as={NavLink} to="/settings/account">
          My Account
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default SettingsNav;
