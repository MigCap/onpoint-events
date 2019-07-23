import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const NavBarDesktop = ({
  auth,
  profile,
  signIn,
  signOut,
  register,
  authenticated
}) => (
  <Menu inverted fixed="top">
    <Container>
      <Menu.Item as={Link} to="/" header>
        <img src="/assets/onpointEvents.png" alt="logo" />
        OnPoint Events
      </Menu.Item>

      <Menu.Item as={NavLink} to="/events" name="Events" />
      {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}

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
        <SignedInMenu auth={auth} profile={profile} signOut={signOut} />
      ) : (
        <SignedOutMenu signIn={signIn} register={register} />
      )}
    </Container>
  </Menu>
);

export default NavBarDesktop;
