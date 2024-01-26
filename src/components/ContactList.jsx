import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync, selectFilteredContacts } from '../redux/contactSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  // Correct the import statement here
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
