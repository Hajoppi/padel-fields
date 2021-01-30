import axios from 'axios';
import {ProviderData} from '../types';

const url = "https://playtomic.io/api/v1/availability"
const tenants: Record<string,string> = {
    kilo: "06f213c5-ac2d-449a-b26f-f7c926b27710",
    suomenoja: "2698b179-57ca-46c0-9856-932b274182d4",
    vantaa: "962b4f9a-56e7-4285-9a17-9b2808db6435",
};

interface item {
  resource_id: string,
  slots: { 
    start_time: string,
    duration: number,
    price: string
  }[]
}



const getTenantFields = async (time: Date, tenant: string, name: string) => {
  const result: string[][] = []
  const day = time.toISOString().split('T')[0];
  const params = {
    user_id: "me",
    tenant_id: tenant,
    sport_id: "PADEL",
    local_start_min: `${day}T00:00:00`, 
    local_start_max: `${day}T23:59:59`,
  }
  const { data } = await axios.get<item[]>(url,{
    params,
  });
  for (const field of data) {
    const times = [...new Set(field.slots.map(x => x.start_time.slice(0,5)))];
    result.push(times);
  }
  return {name, fields: result};
}

export const get = async (time: Date = new Date()): Promise<ProviderData> => {
  let data: ProviderData = [];
  const dataPromises = []
  for (const t of Object.keys(tenants)) {
    const data = getTenantFields(time, tenants[t], t);
    dataPromises.push(data);
  }
  try {
    data = await Promise.all(dataPromises);
  } catch(error) {
    console.error(error);
  }
  return data;
}

export default {
  get,
}