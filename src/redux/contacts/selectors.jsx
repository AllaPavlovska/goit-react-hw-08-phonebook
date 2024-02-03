// import { createSelector } from '@reduxjs/toolkit';

// export const selectContacts = state => state.contacts.items;
// export const selectFilter = state => state.contacts.filter;
// export const selectIsLoading = state => state.contacts.isLoading;
// export const selectError = state => state.contacts.error;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectFilter],
//   (contacts, filter) => {
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   }
// );

import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = state => state.filter.filter;
export const selectContacts = state => state.contacts.contacts;
export const selectStatus = state => state.contacts.status;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);