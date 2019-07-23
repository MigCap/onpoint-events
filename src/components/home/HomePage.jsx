import React from 'react';

const HomePage = ({ history }) => {
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
        <h2>Get on with your events. Do whatever you want</h2>
        <br />
        <br />
        <div
          onClick={() => history.push('/events')}
          className="ui huge teal button">
          Get Started
          <i className="right arrow icon" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
