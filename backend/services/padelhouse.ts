import axios from 'axios';
import {JSDOM} from 'jsdom';
import {ProviderData} from '../types';
const url = "https://padelhouse.slsystems.fi/booking/booking-calendar"

const parseDom = (dom: string): string[][] => {
  const {window: {document}} = new JSDOM(dom);
  const d = document.querySelectorAll(".s-avail>a");
  const fieldStrings: string[] = [];
  d.forEach(item => {
    if(item.firstChild && item.firstChild.textContent) {
      fieldStrings.push(item.firstChild.textContent)
    }
  });
  const result: Record<string,string[]> = {};
  fieldStrings.forEach(string => {
      const [field, time] = string.split(" ")
      if (!result[field])
        result[field] = [];
      result[field].push(time)
    }
  )
  delete result["Pallotykki"];
  return Object.values(result);
}

export const get = async (date: Date = new Date()): Promise<ProviderData> => {
  const day = new Date(date)
  day.setDate(day.getDate() - 1)
  const time = day.toISOString().split('T')[0];

  const params: Record<string, string> = {
    "BookingCalForm[p_laji]": "1",
    "BookingCalForm[p_pvm]": time,
    "BookingCalForm[p_pvm_interval]": "1",
    "BookingCalForm[p_calmode]": "2",
  }
  
  const { data } = await axios.get(url,{
    params,
  });
  const fieldData = parseDom(data);
  return [
    {
      name: "Padelhouse", fields: fieldData
    }
  ];
}

export default {
    get
}