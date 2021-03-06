import React from "react";
import { Link } from "react-router-dom";
import { Menu, Header, Dropdown } from "semantic-ui-react";

const TopBarMobile = ({ profile, auth, authenticated, signIn, signOut, register }) => {
  return (
    <Menu size="mini" fluid borderless>
      <Menu.Item as={Link} to="/events" header>
        <Header textAlign="center" color="grey">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            style={{ fill: "#273746", paddingRight: "0px" }}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <circle cx="7.2" cy="14.4" r="3.2" />
            <circle cx="14.8" cy="18" r="2" />
            <circle cx="15.2" cy="8.8" r="4.8" />
          </svg>
          <Header.Content style={{ padding: "7px 5px 5px 5px" }}>
            <h2 style={{ color: "#273746" }}>OnPoint Events</h2>
          </Header.Content>
        </Header>
      </Menu.Item>

      {authenticated ? (
        <Menu.Item position="right">
          <Dropdown pointing="top right" icon="bars" className="dropdown-icon">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={"/createEvent"} text="Create Event" icon="plus" />
              <Dropdown.Item as={Link} to={"/people"} text="My Network" icon="users" />
              <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
              <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings" />
              <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      ) : (
        <Menu.Item position="right">
          <Dropdown pointing="top right" icon="bars" className="dropdown-icon">
            <Dropdown.Menu>
              <Dropdown.Item text="Sign In" icon="sign-in" onClick={signIn} />
              <Dropdown.Item text="Register" icon="edit" onClick={register} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default TopBarMobile;
