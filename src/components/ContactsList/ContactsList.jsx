// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteContactAsync } from '../../redux/contacts/operations';
// import { selectFilteredContacts } from '../../redux/contacts/selectors';

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const filteredContacts = useSelector(selectFilteredContacts);

//   const handleDeleteContact = (contactId) => {
//     dispatch(deleteContactAsync(contactId));
//   };

//   return (
//     <ul>
//       {filteredContacts.map((contact) => (
//         <li key={contact.id}>
//           {contact.name}: {contact.phone}
//           <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ContactList;
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteContact, selectFilteredContacts } from '../../redux';
import { ContactItem } from 'components';

import css from 'components/ContactsList/ContactsList.module.css';
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