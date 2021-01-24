import axios from "axios";
import querystring from "querystring";
import jsonfile from "./jsonfile.mjs";
import Database from "./database.mjs";

const config = {
  host: "https://9wbo4rq3ho-dsn.algolia.net",
  url: "/1/indexes/beer/query",
  agent: "Algolia for vanilla JavaScript 3.24.8",
  app_id: "9WBO4RQ3HO",
  api_key: "1d347324d67ec472bb7132c66aead485",
  input: "./beer.json",
  read_limit: 5000,
  request_limit: 20,
  retry_wait_ms: 300,
};

const makeBody = (query) =>
  JSON.stringify({
    params: querystring.stringify({
      query: query,
      hitsPerPage: 100,
      clickAnalytics: false,
      analytics: false,
    }),
  });

const makeUrl = (config) =>
  config.host +
  config.url +
  "?" +
  querystring.stringify({
    "x-algolia-agent": config.agent,
    "x-algolia-application-id": config.app_id,
    "x-algolia-api-key": config.api_key,
  });

const makeUntrappdBeerUrl = (index, id) =>
  `https://untappd.com/b/${(index || "").replace(/ /g, "-")}/${id}`;

const makeUntappdBreweryUrl = (index, id) =>
  `https://untappd.com/w/${(index || "").replace(/ /g, "-")}/${id}`;

const transformHit = (hit) => ({
  alcohol: hit.beer_abv ?? null,
  title: hit.brewery_beer_name ?? null,
  brewery: hit.brewery_name ?? null,
  type: hit.type_name ?? null,
  image: hit.brewery_label ?? null,
  popularity: hit.popularity ?? null,
  rating_score: hit.rating_score ?? null,
  rating_count: hit.rating_count ?? null,
  beer_url: hit.bid ? makeUntrappdBeerUrl(hit.beer_index, hit.bid) : null,
  brewery_url: hit.brewery_id
    ? makeUntappdBreweryUrl("_", hit.brewery_id)
    : null,
});

const addUntappdPrefix = (untappdItem) =>
  Object.entries(untappdItem).reduce(
    (acc, cur) => ({ ...acc, ["untappd_" + cur[0]]: cur[1] }),
    {}
  );

const select = (hits, item) =>
  hits.filter((hit) => hit.beer_abv === item.alcohol);

const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const retry = async (fn) =>
  new Promise(async (resolve, reject) => {
    let attempts = 0;
    let err = null;
    while (attempts < 5) {
      if (attempts > 0) {
        console.log("attempt number", attempts);
      }

      try {
        const result = await fn();
        return resolve(result);
      } catch (e) {
        err = e;
        attempts++;
        await wait(config.retry_wait_ms);
      }
    }
    let message = err;
    if (err.response) {
      message = err.response.status + " " + err.response.statusText;
    }
    if (err.code) {
      message = err.code;
    }
    return reject(message);
  });

const tryToGetUntappd = async (item) => {
  const query = item.search_query.split(" ");
  while (query.length > 0) {
    const url = makeUrl(config);
    const body = makeBody(query.join(" "));
    // console.log('query to', url)
    const response = await axios
      .post(url, body)
      .then((response) => response.data);
    const selected = select(response.hits, item).shift() || null;
    if (selected) {
      const transformed = transformHit(selected);
      const prefixed = addUntappdPrefix(transformed);
      return { ...item, ...prefixed };
    }
    query.pop();
  }
  const transformed = transformHit({});
  const prefixed = addUntappdPrefix(transformed);
  return { ...item, ...prefixed };
};

const proc = async (items) =>
  Promise.all(
    items.map(async (item) => {
      const out = await retry(() => tryToGetUntappd(item)).catch(
        (err) => console.error(err) || process.exit(1)
      );
      // console.log("processed position", item.position);
      // console.log({ out });
      return out;
    })
  );

(async () => {
  console.log("started");
  const db = new Database("./beer.nedb");
  await db.prepare("position");
  const saved = (await db.find({}, ["position"])).reduce(
    (acc, item) => ({ ...acc, [item.position]: true }),
    {}
  );
  const input = jsonfile
    .read(config.input)
    .slice(0, config.read_limit)
    .filter((item) => !saved[item.position]);

  let index = 0;
  let shift = config.request_limit;

  while (index < input.length) {
    const items = input.slice(index, index + shift);
    const processed = await proc(items);
    await Promise.all(processed.map((item) => db.insert(item)));
    console.log(`processed ${index + shift} items`);
    index += shift;
  }

  console.log("done", input.length);
})();
