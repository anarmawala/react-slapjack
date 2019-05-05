import React, { useState } from 'react';
import { compose } from 'recompose';

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
  },
  button: {
    padding: '12px 18px 12px 18px',
    borderRadius: '5px',
    fontWeight: 'bold',
    backgroundColor: '#1e88e5',
    border: 'none',
    fontSize: '12pt'
  }
};

const NameInput = (props) => {
  const [user, setUser] = useState('Anonymous');
  const [IP, setIP] = useState('127.0.0.1');
  const [port, setPort] = useState('4000');
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
    <React.Fragment>
      <h1 style={{ marginBottom: '5px' }}>Slapjack</h1>
      <p style={{ marginTop: '5px' }}>
        Brought to you by <br />
        Arshad | Jigar | Angela | Clark
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="ip"
          value={IP}
          placeholder="ip"
          style={styles.input}
          onChange={(e) => {
            setIP(e.target.value);
          }}
          // pattern="\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b"
          // onInvalid={(e) => {
          //   e.target.setCustomValidity('');
          //   if (!e.target.validity.valid) {
          //     e.target.setCustomValidity('Please enter a valid IP address');
          //   }
          // }}
          // onInput={(e) => {
          //   e.target.setCustomValidity('');
          // }}
        />

        <input
          type="text"
          value={port}
          name="port"
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
          name="name"
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

        <button disabled={isSubmitted} style={styles.button}>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default compose()(NameInput);
