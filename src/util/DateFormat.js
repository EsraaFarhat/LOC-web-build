export default function formatAMPM(date) {
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

  var hours = date.getHours();
  var minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =
    +day + "/" + monthNames[month] + " - " + hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function formatDayMonth(date) {
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

  var hours = date.getHours();
  var minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =
    +day + "/" + monthNames[month] + " - " + hours + ":" + minutes + " " + ampm;
  return strTime;
}
