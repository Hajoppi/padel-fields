import express, {Request, Response} from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import playtomic from './services/playtomic';
import padelhouse from './services/padelhouse';
import grani from './services/grani';
const app = express()

app.use(cors());

const cache = new NodeCache({ stdTTL: 280, checkperiod: 300 });

const PORT = process.env.PORT || 3000;

app.get("/:date?", async (request: Request, response: Response) => {
  let date = new Date(request.params.date);
  if (!(date instanceof Date)) {
    console.log("here")
    date = new Date();
  }
  let data = cache.get(date.toDateString());
  if (data) {
    console.log("Using cache");
    response.send(data);
    return;
  }
  const clubPromise = playtomic.get(date);
  const housePromise = padelhouse.get(date)
  const targaPromise = grani.get(date);
  const [club, house, targa] = await Promise.all([clubPromise, housePromise, targaPromise]);
  data = { club,house,targa };
  cache.set(date.toDateString(),data);
  response.send(data);
});


app.listen(PORT, () => {
    console.log(`Serves in running in localhost:${PORT}`);
})