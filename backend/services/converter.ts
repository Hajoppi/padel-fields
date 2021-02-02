import {ProviderData} from '../types';

const times = () => {
  const result: string[] = [];
  const date = new Date();
  date.setHours(8);
  date.setMinutes(0);
  for (let i = 0; i < 33; i += 1) {
    result.push(date.toISOString().slice(11,16));
    date.setMinutes(date.getMinutes() + 30);
  }
  return result;
};

export const convertField = (field: string[]) => {
  const result = times();
  for (let i = 0; i < result.length; i += 1) {
    if(field.indexOf(result[i]) < 0) {
      result[i] = '';
    }
  }
  return result;
}

export const batchConvertFields = (fields: string[][]) => {
  return fields.map(convertField)
}

export const convertProviderdata = (providerData: ProviderData) => {
  for (const place of providerData) {
    place.fields = batchConvertFields(place.fields);
  }
}
export default {
  convertField,
  batchConvertFields,
  convertProviderdata
}