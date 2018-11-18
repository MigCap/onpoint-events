import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/onpointEvents.png"
              alt="logo"
            />
            <div className="content">OnPoint Events</div>
          </h1>
          <h2>Get on with your events. Do whatever you want</h2>
          <br />
          <div
            onClick={() => history.push('/events')}
            className="ui huge white inverted button">
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
