import React, { Fragment } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const NavBarMobile = ({
  auth,
  profile,
  signIn,
  signOut,
  register,
  authenticated,
  activeItem,
  handleItemClick
}) => {
  return (
    <Menu fixed="bottom" icon compact borderless size="huge" widths={6}>
      <Menu.Item
        as={NavLink}
        to="/events"
        name="events"
        active={activeItem === 'events'}
        onClick={handleItemClick}>
        <Icon name="calendar alternate outline" color="teal" size="large" />
      </Menu.Item>

      {authenticated && (
        <Fragment>
          <Menu.Item
            as={Link}
            to="/createEvent"
            name="createEvent"
            active={activeItem === 'createEvent'}
            onClick={handleItemClick}>
            <Icon.Group size="large">
              <Icon name="calendar alternate outline" color="teal" />
              <Icon name="add" corner="bottom right" color="orange" />
            </Icon.Group>
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/people"
            name="people"
            active={activeItem === 'people'}
            onClick={handleItemClick}>
            <Icon name="users" color="teal" size="large" />
          </Menu.Item>
        </Fragment>
      )}

      {authenticated ? (
        <SignedInMenu
          auth={auth}
          profile={profile}
          signOut={signOut}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          navBarMobile={true}
        />
      ) : (
        <SignedOutMenu signIn={signIn} register={register} />
      )}
    </Menu>
  );
};

export default NavBarMobile;
