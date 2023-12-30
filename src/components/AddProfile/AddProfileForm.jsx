import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './AddProfile.module.css';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formData;
    onSubmit({ id: nanoid(), name, number });
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
        <span className={css.formLabelText}> Number:</span>
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

