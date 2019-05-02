import React, { useState } from 'react';
import { compose } from 'recompose';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';

import { consumerSocket } from '../Socket/context';

const styles = {
  form: {
    marginTop: '4px'
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
  const [user, setUser] = useState('Anonymous');
  const [IP, setIP] = useState('127.0.0.1');
  const [port, setPort] = useState('8080');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitted) {
      props.initSocket(IP, port, user);

      setUser('');
      setIsSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={IP}
        placeholder="IP"
        style={styles.input}
        onChange={(e) => {
          setIP(e.target.value);
        }}
        pattern="\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b"
        onInvalid={(e) => {
          e.target.setCustomValidity('');
          if (!e.target.validity.valid) {
            e.target.setCustomValidity('Please enter a valid IP address');
          }
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
      />

      <input
        type="text"
        value={port}
        placeholder="Port"
        style={styles.input}
        onChange={(e) => {
          setPort(e.target.value);
        }}
        pattern="^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$"
        onInvalid={(e) => {
          e.target.setCustomValidity('');
          if (!e.target.validity.valid) {
            e.target.setCustomValidity('Please enter a valid port');
          }
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
      />

      <input
        type="text"
        value={user}
        placeholder="Name"
        style={styles.input}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        pattern="[a-zA-Z][a-zA-Z0-9-_]{0,20}"
        onInvalid={(e) => {
          e.target.setCustomValidity('');
          if (!e.target.validity.valid) {
            e.target.setCustomValidity(
              'Names can be up to 20 characters long and cannot have special characters'
            );
          }
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
      />
      <br />
      <AwesomeButton
        cssModule={AwesomeButtonStyles}
        ripple
        type="primary"
        disabled={isSubmitted}>
        Button
      </AwesomeButton>
    </form>
  );
};

export default compose(consumerSocket)(NameInput);
