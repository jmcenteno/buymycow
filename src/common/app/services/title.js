import { APP_NAME } from '../config/app';

export function getPageTitle() {

  return document.title;

}

export function setPageTitle(data) {

  document.title = `${APP_NAME} - ${data}`;

}
