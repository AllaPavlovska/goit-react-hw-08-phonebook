import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectStatus,
} from '../../redux/contacts/selectors';

import { ContactForm } from 'components/AddProfile/AddProfileForm';
import { Filter } from 'components/Filter/Filter';
import { Container } from 'components/Container/Container';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Loader } from 'components/Loader/Loader';

import css from 'components/App/App.module.css';

export const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return (
    <>
      <Filter />
      <Container>
        <div className={css.inputContainer}>
          <h2>New contact</h2>
          <ContactForm />
        </div>
        <div className={css.contactsContainer}>
          <h2>Contacts</h2>
          {status === 'error' && <p>Error: {error}</p>}
          {status === 'pending' && <Loader />}
          {contacts.length > 0 && status === 'success' && <ContactsList />}
        </div>
      </Container>
    </>
  );
};
