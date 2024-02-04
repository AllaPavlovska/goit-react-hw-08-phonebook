// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getContacts, postContact, delContact } from '../../services/api';

// export const fetchContactsAsync = createAsyncThunk(
//   'contacts/fetchAll',
//   async () => {
//     try {
//       const response = await getContacts();
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const addContactAsync = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, thunkAPI) => {
//     try {
//       const response = await postContact(contact);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContactAsync = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkAPI) => {
//     try {
//       await delContact(contactId);
//       return contactId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';
import { delContact, getContacts, postContact } from 'services/api';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thankApi) => {
    try {
      const contacts = await getContacts();
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

export const apiPostContact = createAsyncThunk(
  'contacts/apiPostContact',
  async (contactDetails, thankApi) => {
    try {
      const contacts = await postContact(contactDetails);
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (contactId, thankApi) => {
    try {
      const contacts = await delContact(contactId);
      return contacts.data;
    } catch (error) {
      return thankApi.rejectWithValue(error.message);
    }
  }
);