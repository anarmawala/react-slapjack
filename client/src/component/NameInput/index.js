import React, { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';

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
    backgroundColor: 'gray',
    border: 'none'
  }
};

const NameInput = (props) => {
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    setUser('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={user}
        style={styles.input}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />

      <AwesomeButton cssModule={AwesomeButtonStyles} ripple type="primary">
        Button
      </AwesomeButton>
    </form>
  );
};

export default NameInput;
