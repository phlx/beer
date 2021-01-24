import Database from "./database.mjs";
import jsonfile from "./jsonfile.mjs";

(async () =>
  jsonfile.save(
    "./public/beer.json",
    await (await new Database("./beer.nedb").prepare("position")).find({}, [
      "position",
      "type",
      "country",
      "price",
      "title",
      "style",
      "density",
      "alcohol",
      "brewery",
      "is_draft",
      "search_query",
      "untappd_alcohol",
      "untappd_title",
      "untappd_brewery",
      "untappd_type",
      "untappd_image",
      "untappd_popularity",
      "untappd_rating_score",
      "untappd_rating_count",
      "untappd_beer_url",
      "untappd_brewery_url",
    ])
  ))();
