import React from 'react';

const Filter = ({ value, onChange }) => (
  <label>
    <h2>Contacts</h2>
    Find contacts by name:
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;
