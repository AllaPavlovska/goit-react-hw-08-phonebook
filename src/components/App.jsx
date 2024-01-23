// import React, { useState } from 'react';
// import ContactForm from './AddProfile/AddProfileForm';
// import ContactList from './ContactList';
// import Filter from './Filter';

// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// export const App = () => {
//   const [contacts, setContacts] = useState(() => {
//     const savedContacts = localStorage.getItem('contacts');
//     return savedContacts ? JSON.parse(savedContacts) : initialContacts;
//   });

//   const [filter, setFilter] = useState('');

//   const handleAddContact = (contact) => {
//     const isNameExist = contacts.some(
//       (existingContact) => existingContact.name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (isNameExist) {
//       alert(`'${contact.name}' is already in contacts!`);
//       return;
//     }

//     setContacts((prevContacts) => [...prevContacts, contact]);
//   };

//   const handleDeleteContact = (contactId) => {
//     setContacts((prevContacts) =>
//       prevContacts.filter((contact) => contact.id !== contactId)
//     );
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <ContactForm onSubmit={handleAddContact} />
//       <Filter value={filter} onChange={handleFilterChange} />
//       <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
//     </div>
//   );
// };

// export default App;

import ContactForm from '../components/AddProfile/AddProfileForm';
import Filter from './Filter';

export const App = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />
    </div>
  );
};
export default App;
