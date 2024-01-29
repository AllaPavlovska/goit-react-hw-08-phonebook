import { createSlice } from '@reduxjs/toolkit';
import { fetchContactsAsync, addContactAsync, deleteContactAsync } from './operations';
import { selectContacts, selectFilter, selectIsLoading, selectError, selectFilteredContacts } from './selectors';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContactAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = contactSlice.actions;
export { selectContacts, selectFilter, selectIsLoading, selectError, selectFilteredContacts };
export default contactSlice.reducer;
