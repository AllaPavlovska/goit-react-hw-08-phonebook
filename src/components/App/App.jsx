// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchContactsAsync } from '../../redux/contacts/operations';
// import { selectIsLoading, selectError } from '../../redux/contacts/selectors';
// import ContactForm from '../AddProfile/AddProfileForm';
// import ContactList from '../ContactList/ContactList';
// import Filter from '../Filter/Filter';

// export const App = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     dispatch(fetchContactsAsync());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <ContactForm />
//       <Filter />
//       <ContactList />
//     </div>
//   );
// };

// export default App;

import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Contacts, LogIn, Register } from 'pages';
import { Layout, PrivatRoute } from 'components';

import 'react-notifications/lib/notifications.css';
import { Home } from 'pages';
import { authRefreshUser, selectAuthIsRefreshing } from '../../redux';
import { RestrictedRoute } from 'components';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(authRefreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={Register} redirectTo="/contacts" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={LogIn} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={<PrivatRoute component={Contacts} redirectTo="/" />}
          />
        </Route>
      </Routes>
    )
  );
};