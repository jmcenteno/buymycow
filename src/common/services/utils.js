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
    interval: 'minute(s)',
    difference: 0
  }

  const intervals = ['day', 'hour', 'minute'];
  
  for (let i = 0; i < intervals.length; i++) {
    
    const difference = moment(new Date(endDate)).diff(moment(), `${intervals[i]}s`);
    
    if (difference > 0) {
      remainingTime = { interval: `${intervals[i]}(s)`, difference };
      break;
    }

  }

  return remainingTime;

}
