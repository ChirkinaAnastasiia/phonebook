import {getContactData} from './modules/serviceStorage.js';
import * as render from './modules/render.js';
import control from './modules/control.js';

const {
  modalControl,
  deleteControl,
  formControl,
  filterControl,
  hoverRow,
} = control;


{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      filterName,
      filterSurname,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = render.renderPhoneBook(app, title);

    // функционал
    const allRow = render.renderContacts(list, getContactData('phonebook'));
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    filterControl(filterName, filterSurname, list, logo);
  };

  window.phoneBookInit = init;
}

