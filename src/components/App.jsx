import ContactForm from '../components/AddProfile/AddProfileForm';
import ContactList from './ContactList';
import Filter from './Filter';

export const App = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};
export default App;
