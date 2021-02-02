import express, {Request, Response} from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import playtomic from './services/playtomic';
import padelhouse from './services/padelhouse';
import grani from './services/grani';
import {convertProviderdata} from './services/converter';
const app = express()

app.use(cors());

const cache = new NodeCache({ stdTTL: 280, checkperiod: 300 });

const PORT = process.env.PORT || 3000;

app.get("/:date?", async (request: Request, response: Response) => {
  let date = new Date(request.params.date);
  if (!(date instanceof Date)) {
    date = new Date();
  }
  let data = cache.get(date.toDateString());
  if (data) {
    response.send(data);
    return;
  }
  const clubPromise = playtomic.get(date);
  const housePromise = padelhouse.get(date)
  const targaPromise = grani.get(date);
  const temp = await Promise.all([clubPromise, housePromise, targaPromise]);
  for (let provider of temp) {
    convertProviderdata(provider)
  }
  const [club,house,targa] = temp
  data = { club, house, targa };
  cache.set(date.toDateString(),data);
  response.send(data);
});


app.listen(PORT, () => {
    console.log(`Serves in running in localhost:${PORT}`);
})