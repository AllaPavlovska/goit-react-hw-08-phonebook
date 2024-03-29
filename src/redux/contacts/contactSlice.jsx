import { createSlice } from '@reduxjs/toolkit';
import { statusState } from '../constants';
import { apiDeleteContact, apiGetContacts, apiPostContact } from './operations';
import {
  handleFulfilledAdd,
  handleFulfilledDelete,
  handleFulfilledGet,
  handlePending,
  handleRejected,
} from './handleFunctionReduser';

const initialContacts = {
  contacts: [],
  status: statusState.idle,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addLocation(state, action) {
      state.location = action.payload;
    },
  },
  extraReducers: builder =>
    builder

      .addCase(apiGetContacts.pending, handlePending)
      .addCase(apiGetContacts.fulfilled, handleFulfilledGet)
      .addCase(apiGetContacts.rejected, handleRejected)

      .addCase(apiPostContact.pending, handlePending)
      .addCase(apiPostContact.fulfilled, handleFulfilledAdd)
      .addCase(apiPostContact.rejected, handleRejected)

      .addCase(apiDeleteContact.pending, handlePending)
      .addCase(apiDeleteContact.fulfilled, handleFulfilledDelete)
      .addCase(apiDeleteContact.rejected, handleRejected),
});

export const { addLocation } = contactsSlice.actions;
export const contactsReduser = contactsSlice.reducer;
