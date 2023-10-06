
export default function addDateAndTime(dateStr, timeStr) {
  const dateParts = String(dateStr).split(' ');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const year = parseInt(dateParts[3]);
  const month = monthNames.indexOf(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const timeParts = timeStr.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const newDate = new Date(year, month, day, hours, minutes).getTime();

  return newDate;
}