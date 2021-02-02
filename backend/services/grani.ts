import axios from "axios";
import { JSDOM } from 'jsdom';
import {ProviderData} from '../types'
const url = "https://extweb420.dlsoftware.com/index.php";

const parseDom = (dom: string): string[][] => {
  const {window: {document}} = new JSDOM(dom);
  const tableRows = document
    .querySelector("table.calendar_table.table.table-bordered")
    ?.querySelectorAll("tr");
  if(!tableRows) return []

  const result: Record<string,string[]> = {
    first: [],
    second: [],
    third: [],
  }
  tableRows.forEach(row => {
    const time = row.children[0].innerHTML.split('-')[0].slice(0, 5);
    const first = row.children[1].className.indexOf("state_white") > -1;
    const second = row.children[2].className.indexOf("state_white") > -1;
    const third = row.children[3].className.indexOf("state_white") > -1;
    if (!time) return
    if (first) result.first.push(time)
    if (second) result.second.push(time)
    if (third) result.third.push(time)
  });
  return Object.values(result);
}

export const get = async(time: Date = new Date()): Promise<ProviderData> => {
  const day = time.toISOString().split('T')[0].split('-').reverse().join('.')
  const params = {
    func: "mod_rc_v2",
    pageId: 11,
    cdate: day,
  }
  try {
    const { data } = await axios.get(url,{params})
    const fieldData = parseDom(data);
    return [
      {
        name: "Grani", fields: fieldData
      }
    ];
  }
  catch (error) {
    console.error(error)
    return [];
  }
}

export default {
  get
}