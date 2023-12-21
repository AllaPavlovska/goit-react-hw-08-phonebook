import React, { Component } from 'react';
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

export class App extends Component {
  state = { ...initialState };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (contact) => {
    const { contacts } = this.state;

    const isNameExist = contacts.some(
      (existingContact) => existingContact.name === contact.name
    );

    if (isNameExist) {
      alert(`'${contact.name}' is already in contacts!`);
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;
