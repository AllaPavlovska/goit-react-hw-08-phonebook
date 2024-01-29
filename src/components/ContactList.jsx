import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync } from '../redux/operations';
import { selectFilteredContacts } from '../redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContactAsync(contactId));
  };

  return (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}
          <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
