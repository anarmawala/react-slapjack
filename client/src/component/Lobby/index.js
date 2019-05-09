import React from 'react';

const Lobby = (props) => {
  return (
    <React.Fragment>
      <div>Hello {props.name}, </div>
      <h1>Welcome to Slapjack</h1>

      {props.players.map((value, index) => (
        <span key={index}>{value}</span>
      ))}

      {props.message}
    </React.Fragment>
  );
};

export default Lobby;
