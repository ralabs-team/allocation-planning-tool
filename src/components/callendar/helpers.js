import moment from 'moment';

export const getVisiblePeriod = () => {
  const now = moment().startOf('d');
  const start = moment(now).startOf('M');
  const end = moment(now).endOf('M');
  if (now.diff(start, 'd') <= 4) {
    return {
      minDate: start,
      maxDate: moment(start).add(5, 'd'),
    };
  } else if (end.diff(now, 'd') <= 4) {
    return {
      minDate: moment(end).add(-5, 'd'),
      maxDate: end,
    };
  }
  return {
    minDate: now,
    maxDate: moment(now).add(5, 'd'),
  };
};

export const isWeekend = (time) => {
  const day = moment(time).weekday();
  return day === 0 || day === 6;
};
