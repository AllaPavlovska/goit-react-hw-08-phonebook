// import { createSlice } from '@reduxjs/toolkit';
// import { fetchContactsAsync, addContactAsync, deleteContactAsync } from './operations';
// import { selectContacts, selectFilter, selectIsLoading, selectError, selectFilteredContacts } from './selectors';

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//     filter: '',
//   },
//   reducers: {
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContactsAsync.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchContactsAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchContactsAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addContactAsync.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addContactAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addContactAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteContactAsync.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteContactAsync.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = state.items.filter(
//           contact => contact.id !== action.payload
//         );
//       })
//       .addCase(deleteContactAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setFilter } = contactSlice.actions;
// export { selectContacts, selectFilter, selectIsLoading, selectError, selectFilteredContacts };
// export default contactSlice.reducer;

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
  status: statusState.idle, // "idle" | "pending" | "success" | "error"
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

      // ============= GET Contacts ===============
      .addCase(apiGetContacts.pending, handlePending)
      .addCase(apiGetContacts.fulfilled, handleFulfilledGet)
      .addCase(apiGetContacts.rejected, handleRejected)

      // ============= ADD Contact ===============
      .addCase(apiPostContact.pending, handlePending)
      .addCase(apiPostContact.fulfilled, handleFulfilledAdd)
      .addCase(apiPostContact.rejected, handleRejected)

      // ============= Delete Contact ===============
      .addCase(apiDeleteContact.pending, handlePending)
      .addCase(apiDeleteContact.fulfilled, handleFulfilledDelete)
      .addCase(apiDeleteContact.rejected, handleRejected),
});

export const { addLocation } = contactsSlice.actions;
export const contactsReduser = contactsSlice.reducer;