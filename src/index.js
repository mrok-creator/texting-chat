// const dotenvParseVariables = require('dotenv-parse-variables');

// const env = dotenvParseVariables(process.env);
// console.log(env);

import { authWithPopup, onClickSignOut, pushData } from './service';
import { uploadUserFile } from './service/storage-api';
import {
  btnSignIn,
  btnSignOut,
  textWindow,
  btnSend,
  textArea,
  textContainer,
  fileLoad,
  loaderStatus,
} from './js/refs';
import { markup } from './js/markup';

btnSignIn.addEventListener('click', authWithPopup);
btnSignOut.addEventListener('click', onClickSignOut);
btnSend.addEventListener(`click`, getValue);

function hiddenToggle(ref, flag = true) {
  ref.hidden = flag;
}
let userId = null;
let photoURL = null;

function authAccess(user) {
  if (!user) {
    return;
  }

  hiddenToggle(btnSignIn);
  hiddenToggle(btnSignOut, false);
  hiddenToggle(textContainer, false);

  userId = user.uid;
  photoURL = user.photoURL;
}

function authDecline() {
  hiddenToggle(btnSignIn, false);
  hiddenToggle(btnSignOut);
  hiddenToggle(textContainer);
}

function getValue(e) {
  const textValue = textArea.value.trim();
  if (!textValue) {
    return;
  }
  textArea.value = ``;
  pushData(createDataObject(photoURL, textValue, 'message'));
}

function createDataObject(avatar, message, type, picture = '') {
  const date = getTime();
  return { uid: userId, avatar, message, date, type, picture };
}

function getTime() {
  const newTime = new Date();
  return `${newTime.getHours().toString().padStart(2, '0')}:${newTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}
function viewUpdate(arr) {
  const dataMarkup = markup(arr, userId);
  addMessages(dataMarkup);
}
function addMessages(str = '') {
  textWindow.innerHTML = str;
}

fileLoad.addEventListener('change', addCustomerFile);

function addCustomerFile(e) {
  const file = e.target.files[0];
  uploadUserFile(file);
}

function onStatusLoader(process) {
  loaderStatus.style.width = process + '%';
}

function loaderWrapper(percent) {
  onStatusLoader(percent);
  const parent = loaderStatus.parentNode;
  if (percent > 0 && percent < 99) {
    togglesShoveElement(parent);
  } else {
    togglesShoveElement(parent, false);
  }
}
function togglesShoveElement(el, flag = true) {
  if (flag) {
    if (el.classList.contains('visually-hidden')) {
      el.classList.remove('visually-hidden');
    }
  } else {
    el.classList.add('visually-hidden');
  }
}

export { authAccess, authDecline, viewUpdate, onStatusLoader, loaderWrapper, createDataObject };
