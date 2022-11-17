import { Container, SectionContainer } from './App.styled';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (contacts) {
      return parsedContacts;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalisedName = name.toLowerCase();

    contacts.find(contact => contact.name.toLowerCase() === normalisedName)
      ? alert(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <SectionContainer>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </SectionContainer>
      <SectionContainer>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </SectionContainer>
    </Container>
  );
};
