import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './AddProfile.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <label className={css.formLabel}>
          <span className={css.formLabelText}>Name:</span>
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <span className={css.formLabelText}> Number:</span>
          <input
            className={css.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
