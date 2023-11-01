export const getContactData = () => (localStorage.getItem('phonebook') ?
  JSON.parse(localStorage.getItem('phonebook')) : []);

export const setContactData = data =>
  localStorage.setItem('phonebook', JSON.stringify(data));

export const addContactData = contact => {
  const data = getContactData('phonebook');
  data.push(contact);
  setContactData(data);
};

export const removeContactData = phone => {
  const data = getContactData('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  setContactData(newData);
};

