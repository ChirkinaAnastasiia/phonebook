import {
  createHeader,
  createLogo,
  createMain,
  createButtonGroup,
  createTable,
  createForm,
  createFooter,
  createFooterText,
  createRow,
} from './createElements.js';


const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const {
    table,
    filterName,
    filterSurname,
  } = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter();
  const footerText = createFooterText(title);

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  footer.footerContainer.append(footerText);

  app.append(header, main, footer);

  return {
    list: table.tbody,
    filterName,
    filterSurname,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

export {renderPhoneBook, renderContacts};
