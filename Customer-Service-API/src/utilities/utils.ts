import moment from 'moment';

export function parseDateTimeZone(date: Date, timeZone: '+00:00' | '+07:00' = '+00:00', format = '') {
  return moment(date).utcOffset(timeZone).format(format);
}

export function parseDateTimeZoneStartOrEnd(
  date: Date,
  timeZone: '+00:00' | '+07:00' = '+00:00',
  format = '',
  start = true,
) {
  if (start) {
    return moment(date).utcOffset(timeZone).startOf('date').format(format);
  } else {
    return moment(date).utcOffset(timeZone).endOf('date').format(format);
  }
}

export function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, milliseconds);
  });
}
