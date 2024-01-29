import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, postContact, delContact } from '../services/api';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    try {
      const response = await getContacts();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await postContact(contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await delContact(contactId);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
