import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync, selectIsLoading, selectError } from '../redux/contactSlice';
import ContactForm from '../components/AddProfile/AddProfileForm';
import ContactList from './ContactList';
import Filter from './Filter';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
