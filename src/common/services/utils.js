import moment from 'moment';

export function paginate(arr) {
  
  const pages = [];
  let page = [];

  arr.forEach((item, i) => {

    page.push(item);

    if ((i + 1) % 3 === 0 || (i + 1) >= arr.length) {
      pages.push(page);
      page = [];
    }

  });

  return pages;

}

export function getRemainingTime(endDate) {
  
  let remainingTime = {
    interval: 'minutes',
    difference: 0
  }

  const intervals = ['days', 'hours', 'minutes'];
  
  for (let i = 0; i < intervals.length; i++) {
    
    const difference = moment(endDate).diff(moment(), intervals[i]);
    
    if (difference) {
      remainingTime = { interval: intervals[i], difference };
      break;
    }

  }

  return remainingTime;

}
