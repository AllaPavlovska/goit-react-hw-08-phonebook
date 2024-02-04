import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { apiDeleteContact } from '../../redux/contacts/operations';
import { ContactItem } from 'components/ContactItem/ContactItem';

import css from 'components/ContactsList/ContactList.module.css';
import { NotificationManager } from 'react-notifications';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClickDelBtn={() =>
              dispatch(apiDeleteContact(contact.id))
                .unwrap()
                .then(data =>
                  NotificationManager.success(
                    `${data.name} was successfully deleted`
                  )
                )
            }
          />
        ))}
      </ul>
    </>
  );
};
