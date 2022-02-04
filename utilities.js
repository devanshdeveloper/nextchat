export function interpretError(e) {
  return capitalize(e.slice(e.indexOf("/") + 1).replaceAll("-", " "));
}

const months = [
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

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function capitalize(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

export function getFormattedDate(date) {
  const d = new Date(date);
  return `${weeks[d.getDay()]}, ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;
}
