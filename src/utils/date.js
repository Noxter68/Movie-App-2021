export function formattedDate(newDate) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(newDate);

  const date = d.getDate();
  const month = monthNames[d.getMonth()]; // Since getMonth() returns month from 0-11 not 1-12
  const year = d.getFullYear();


  var countDownDate = new Date(newDate).getTime();

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  const text = " (Coming Soon) "
  // If the count down is finished, write some text
  if (distance < 0) {
     return date + " " + month + " " + year;
  } else {
     return date + " " + month + " " + year + text;
  }
}

export function getDate(release) {
  if (release) {
    return release.substring(0,4);
  } else {
    return release;
  }
}

export default {
  formattedDate,
  getDate
};
