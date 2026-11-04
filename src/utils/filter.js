const datetime = (timestap) => {
  if (
    !timestap ||
    (Object.prototype.toString.apply(timestap) !== "[object String]" &&
      Object.prototype.toString.apply(timestap) !== "[object Number]")
  ) {
    console.error("argument is invalid!");
    return timestap;
  }
  const date = new Date(timestap);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  if (m >= 1 && m <= 9) {
    m = "0" + m;
  }
  if (d >= 0 && d <= 9) {
    d = "0" + d;
  }
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};

export default { datetime };
