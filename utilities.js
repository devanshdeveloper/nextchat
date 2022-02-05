export function interpretError(e) {
  if (!e) return "";
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

const pad = (e) => (e > 9 ? `${e}` : `0${e}`);

export function getFormattedDate(date) {
  const d = new Date(date);
  return `${weeks[d.getDay()]}, ${d.getDate()} ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;
}

export function getFormattedTime(time) {
  const d = new Date(time);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const messages = [
  "Just Joined",
  "Just Joined With Fuckin Ass",
  "Entered The Room",
  "Hi",
  "Mai Agaya",
  "Mera Suagat Karo",
  "Mene Kuch Nahi Pada",
];
export function randomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
