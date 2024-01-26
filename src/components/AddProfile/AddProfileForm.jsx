import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsync, selectContacts, selectIsLoading, selectError } from '../../redux/contactSlice';
import css from './AddProfile.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = formData;

    const isNameExist = contacts.some(
      (existingContact) => existingContact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExist) {
      alert(`'${name}' is already in contacts!`);
      return;
    }

    dispatch(addContactAsync({ name, phone }));
    setFormData({ name: '', phone: '' });
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <label className={css.formLabel}>
        <span className={css.formLabelText}>Name:</span>
        <input
          className={css.formInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <span className={css.formLabelText}>Phone:</span>
        <input
          className={css.formInput}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      {isLoading && <p>Saving...</p>}
      {error && <p>Error: {error}</p>}
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
