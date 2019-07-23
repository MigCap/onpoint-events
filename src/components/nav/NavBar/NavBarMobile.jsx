import React, { Fragment } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const NavBarMobile = ({ authenticated }) => {
  return (
    <Menu fixed="bottom" fluid icon borderless size="huge" widths={6}>
      <Menu.Item as={NavLink} to="/events" name="events">
        <Icon name="calendar alternate outline" color="teal" size="large" />
      </Menu.Item>

      {authenticated && (
        <Menu.Item as={NavLink} to="/createEvent" name="createEvent">
          <Icon name="add" corner="bottom right" color="teal" size="large" />
        </Menu.Item>
      )}

      {authenticated && (
        <Fragment>
          <Menu.Item as={NavLink} to="/people" name="people">
            <Icon name="address book outline" color="teal" size="large" />
          </Menu.Item>
          {/* <Menu.Item
            as={Link}
            to={`/settings/about`}
            name="profile"
            active={activeItem === 'profile'}
            onClick={handleItemClick}>
            <Icon name="setting" color="teal" size="large" />
          </Menu.Item> */}
        </Fragment>
      )}
    </Menu>
  );
};

export default NavBarMobile;
