import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsReduser } from '../redux/contacts/contactSlice';
import { filterReduser } from '../redux/contacts/filterSlice';
import { authReduser } from '../redux/auth/authSlice';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
  // blacklist: ['filter'],
};

export const store = configureStore({
  reducer: {
    contacts: contactsReduser,
    filter: filterReduser,
    auth: persistReducer(authConfig, authReduser),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
