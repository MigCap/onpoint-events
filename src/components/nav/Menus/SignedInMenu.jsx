import React from 'react';
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({
  signOut,
  profile,
  auth,
  navBarMobile,
  activeItem,
  handleItemClick
}) => {
  if (navBarMobile) {
    return (
      <Menu.Item
        as={Link}
        to={`/profile/${auth.uid}`}
        name="profile"
        active={activeItem === 'profile'}
        onClick={handleItemClick}>
        <Icon name="user circle outline" color="teal" size="large" />
      </Menu.Item>
    );
  } else if (!navBarMobile) {
    return (
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={profile.photoURL || '/assets/user.png'}
        />
        <Dropdown pointing="top left" text={profile.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={'/createEvent'}
              text="Create Event"
              icon="plus"
            />
            <Dropdown.Item
              as={Link}
              to={'/people'}
              text="My Network"
              icon="users"
            />
            <Dropdown.Item
              as={Link}
              to={`/profile/${auth.uid}`}
              text="My Profile"
              icon="user"
            />
            <Dropdown.Item
              as={Link}
              to="/settings"
              text="Settings"
              icon="settings"
            />
            <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  }
};

export default SignedInMenu;
