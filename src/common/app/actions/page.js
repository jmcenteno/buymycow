import * as Title from '../services/title';

export const PAGE_TITLE = 'PAGE_TITLE';

export function setPageTitle(data) {

  Title.setPageTitle(data);

  return {
    type: PAGE_TITLE,
    data
  };
  
}
