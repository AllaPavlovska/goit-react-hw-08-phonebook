import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactSlice';
import css from './AddProfile.module.css';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formData;
    dispatch(addContact({ id: nanoid(), name, number }));
    setFormData({ name: '', number: '' });
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
        <span className={css.formLabelText}>Number:</span>
        <input
          className={css.formInput}
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;

