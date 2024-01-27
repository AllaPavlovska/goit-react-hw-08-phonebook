import axios from 'axios';

axios.defaults.baseURL = 'https://65b37c15770d43aba479dab4.mockapi.io';

export const getContacts = async () => {
  const contacts = await axios.get('/contacts/contacts');

  return contacts;
};

export const getContactById = async contactId => {
  const contacts = await axios.get(`/contacts/contacts/${contactId}`);

  return contacts;
};

export const postContact = async ({ name, phone,  }) => {
  const contact = await axios.post('/contacts/contacts', {
    name,
    phone,
  });

  return contact;
};

export const delContact = async contactId => {
  const contact = await axios.delete(`/contacts/contacts/${contactId}`);

  return contact;
};