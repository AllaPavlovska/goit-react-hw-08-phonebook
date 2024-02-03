// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContactAsync } from '../../redux/contacts/operations';
// import { selectContacts, selectIsLoading, selectError } from '../../redux/contacts/selectors';
// import css from './AddProfile.module.css';

// const ContactForm = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(selectContacts);
//   const isLoading = useSelector(selectIsLoading);
//   const error = useSelector(selectError);

//   const [formData, setFormData] = useState({ name: '', phone: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const { name, phone } = formData;

//     const isNameExist = contacts.some(
//       (existingContact) => existingContact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (isNameExist) {
//       alert(`'${name}' is already in contacts!`);
//       return;
//     }

//     dispatch(addContactAsync({ name, phone }));
//     setFormData({ name: '', phone: '' });
//   };

//   return (
//     <form className={css.form} onSubmit={handleFormSubmit}>
//       <label className={css.formLabel}>
//         <span className={css.formLabelText}>Name:</span>
//         <input
//           className={css.formInput}
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <span className={css.formLabelText}>Phone:</span>
//         <input
//           className={css.formInput}
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       {isLoading && <p>Saving...</p>}
//       {error && <p>Error: {error}</p>}
//       <button type="submit">Add Contact</button>
//     </form>
//   );
// };

// export default ContactForm;
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { apiGetContacts, apiPostContact, selectContacts } from '../../redux';
import { Formik } from 'formik';
import { Button } from 'components';
import * as Yup from 'yup';
import css from 'components/AddProfile/AddProfile.module.css';

function isExists(name, contacts) {
  return contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
}

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const inputForm = useRef();

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const handleSubmit = (value, action) => {
    if (isExists(value.name, contacts)) {
      NotificationManager.info(`${value.name} is alredy in contacts`);
      return;
    }

    dispatch(apiPostContact(value))
      .unwrap()
      .then(data =>
        NotificationManager.success(`${data.name} was successfully added`)
      );

    action.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .min(3, 'Name is too short - should be 3 chars minimum'),
        number: Yup.string()
          .required('Number is required')
          .min(1, 'Number is too short - should be 1 chars minimum'),
      })}
    >
      {formik => {
        const {
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <form ref={inputForm} className={css.form} onSubmit={handleSubmit}>
            <label className={css.form_label}>
              <span className={css.text}>Name</span>
              <input
                className={css.form_input}
                id="name"
                type="text"
                name="name"
                placeholder="name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                title="Name should be 3 chars minimum"
              />
            </label>
            <label className={css.form_label}>
              <span className={css.text}>Telefone</span>
              <input
                className={css.form_input}
                id="number"
                type="tel"
                name="number"
                placeholder="number"
                autoComplete="off"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                title="Number may contain only numbers and dushes. For example 050-111-2233"
              />
            </label>

            <Button type="submit" isDisabled={!(dirty && isValid)}>
              Add contact
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};