import React, { useState, useEffect } from 'react';
import ContactForm from './AddProfile/AddProfileForm';
import ContactList from './ContactList';
import Filter from './Filter';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export const App = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setState((prev) => ({ ...prev, contacts: JSON.parse(savedContacts) }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleAddContact = (contact) => {
    const isNameExist = state.contacts.some(
      (existingContact) => existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isNameExist) {
      alert(`'${contact.name}' is already in contacts!`);
      return;
    }

    setState((prev) => ({ ...prev, contacts: [...prev.contacts, contact] }));
  };

  const handleDeleteContact = (contactId) => {
    setState((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  const handleFilterChange = (e) => {
    setState({ ...state, filter: e.target.value });
  };

  const filteredContacts = state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <Filter value={state.filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;

