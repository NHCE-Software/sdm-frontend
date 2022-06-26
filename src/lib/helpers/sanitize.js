import isAlphaNumeric from "./isAlphaNumeric";

function sanitize(item) {
  let s = "";

  for (let i = 0; i < item.length; i++) {
    let char = item.charAt(i);
    if (isAlphaNumeric(char)) s += char.toLowerCase();
  }
  return s;
}

export default sanitize;
