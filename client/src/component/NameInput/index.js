import React, { useState } from 'react';
import { compose } from 'recompose';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';

import { consumerSocket } from '../Socket/context';

const styles = {
  form: {
    marginTop: '10pt'
  },
  input: {
    padding: '12px',
    fontSize: '12pt',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginRight: '1em',
    marginBottom: '1em',
    backgroundColor: 'gray',
    border: 'none'
  }
};

const NameInput = (props) => {
  const [user, setUser] = useState('');
  const [IP, setIP] = useState('127.0.0.1');
  const [port, setPort] = useState('8080');

  let hasSubmited = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.initSocket(IP, port, user);

    setUser('');
    hasSubmited = true;
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={IP}
        disabled={hasSubmited}
        placeholder="IP"
        style={styles.input}
        onChange={(e) => {
          setIP(e.target.value);
        }}
      />

      <input
        type="text"
        value={port}
        disabled={hasSubmited}
        placeholder="Port"
        style={styles.input}
        onChange={(e) => {
          setPort(e.target.value);
        }}
      />

      <input
        type="text"
        value={user}
        disabled={hasSubmited}
        placeholder="Name"
        style={styles.input}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <br />
      <AwesomeButton cssModule={AwesomeButtonStyles} ripple type="primary">
        Button
      </AwesomeButton>
    </form>
  );
};

export default compose(consumerSocket)(NameInput);
