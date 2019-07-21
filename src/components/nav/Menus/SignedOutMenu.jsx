import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';

const SignedOutMenu = ({ signIn, register, navBarMobile }) => {
  if (!navBarMobile) {
    return (
      <Menu.Item position="right">
        <Button onClick={signIn} basic inverted content="Login" />
        <Button
          onClick={register}
          basic
          inverted
          content="Register"
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
    );
  }
};

export default SignedOutMenu;
