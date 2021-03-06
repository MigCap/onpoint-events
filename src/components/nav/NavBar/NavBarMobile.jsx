import React, { Fragment } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavBarMobile = ({ authenticated }) => {
  return (
    <Menu fixed="bottom" fluid icon borderless size="huge" widths={6} className="bottom-navBar">
      <Menu.Item as={NavLink} to="/events" name="events">
        <Icon name="calendar alternate outline" color="grey" size="large" />
      </Menu.Item>

      {authenticated && (
        <Menu.Item as={NavLink} to="/createEvent" name="createEvent">
          <Icon name="add" corner="bottom right" color="grey" size="large" />
        </Menu.Item>
      )}

      {authenticated && (
        <Fragment>
          <Menu.Item as={NavLink} to="/people" name="people">
            <Icon name="address book outline" color="grey" size="large" />
          </Menu.Item>
        </Fragment>
      )}
    </Menu>
  );
};

export default NavBarMobile;
