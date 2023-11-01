import {createRow} from './createElements.js';
import {renderContacts} from './render.js';
import {
  getContactData,
  setContactData,
  addContactData,
  removeContactData,
} from './serviceStorage.js';


const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const sortedByField = (fieldName, list, logo) => {
  const data = getContactData('phonebook');
  const newData = data.sort((a, b) => (a[fieldName] > b[fieldName] ? 1 : -1));
  setContactData(newData);

  list.innerHTML = '';
  const allRow =
    renderContacts(list, getContactData('phonebook'));
  hoverRow(allRow, logo);
};

const filterControl = (filterName, filterSurname, list, logo) => {
  filterName.addEventListener('click', () => {
    sortedByField('name', list, logo);
  });

  filterSurname.addEventListener('click', () => {
    sortedByField('surname', list, logo);
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.remove('is-visible');
    });
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target === formOverlay ||
        target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();

      const phone =
        target.closest('.contact').querySelector('[href]').innerHTML;
      removeContactData(phone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  formControl,
  filterControl,
  hoverRow,
};
