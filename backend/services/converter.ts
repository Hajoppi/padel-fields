const fieldSlot = (time: string, field: string[]): boolean => {
  return field.indexOf(time) > -1;
};

const times = ()  => {
  const result: string[] = [];
  const date = new Date();
  date.setHours(8);
  date.setMinutes(0);
  for (let i = 0; i < 33; i += 1) {
    result.push(date.toLocaleTimeString('en-GB').slice(0, 5));
    date.setMinutes(date.getMinutes() + 30);
  }
  return result;
};

const convert = (fields: string[][]) => {
}