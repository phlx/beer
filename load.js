const axios = require("axios");
const fs = require("fs");

const config = {
  host: "http://beruvyhodnoy.ru",
  urls: {
    stock: "/stock/get",
  },
  shops: {
    peace: {
      id: 14,
      address: "ПРОСПЕКТ МИРА, 79",
      desc: "200 кранов, 3000+ сортов на полке",
    },
  },
  output: "./beer.json",
};

const correlationPositionToSearchQuery = {
  44: "вятич 31 зеленое", // ВЯТИЧ 31 ДЕНЬ "ЗЕЛЕНОЕ"
};

const getStock = () =>
  axios(
    config.host + config.urls.stock + `/?shop_id=${config.shops.peace.id}`
  ).then((data) => data.data.data);

const replaceSearchQuery = (searchQuery, style) =>
  searchQuery
    .replace(style || "", "")
    .replace(/[\/'"\[\]]/g, "")
    .replace(/\(.+\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/^(Aged|Пивоварня|Набор|)\s+/g, "")
    .replace(
      new RegExp(
        "/" +
          [
            "",
            "(?:б\\/а)?",
            "(?:n\\d+)?",
            "(?:\\w+&\\w+)?",
            "(?:barleywine)?",
            "(?:\\d{4}\\/)?",
            "(?:\\d{4})?",
            "(?:ass(?:a|e)?mbl?age\\s*\\d{0,3})?",
            "(?:" +
              [
                "Lambic",
                "Quadrupel BA",
                "Belgian Tripel",
                "Old Geuze",
                "Munich Dunkel",
                "Rye Triple",
                "ed\\.?\\s*(?:№|#)?\\d{0,2}",
                "\\d{4}.+Ale",
                "(?:Strong|(?:Orange)?\\s*(?:Smoothie)?\\s*?Sour|\\sBA\\s.+|Fruit)\\s*(?:Ale|Stout))?",
              ].join("|"),
            "(?:темн.?|светл.?)?",
            "(?:в\\s*тубе)?",
            "(?:св\\.?)?",
            "\\d{0,2}(?:\\.|,)?\\d{0,5}?",
            "(?:бут.?|бан.?|Aged)",
            "(?:в (?:подаро|деревя).+)?",
          ].join("\\s*") +
          "/",
        "gi"
      ),
      ""
    )
    .trim();

const transformDraft = (item) => ({
  position: Number(item.i),
  type: item.c,
  country: null,
  price: Number(item.p),
  title: item.t,
  style: item.s,
  density: Number(item.d),
  alcohol: parseFloat(item.a),
  brewery: item.m,
  is_draft: true,
  search_query: correlationPositionToSearchQuery[item.i] || replaceSearchQuery(item.t, item.s),
});

const transformBottle = (item) => ({
  position: Number(item.i),
  type: null,
  country: item.c,
  price: Number(item.p),
  title: item.t,
  style: item.s,
  density: Number(item.d),
  alcohol: parseFloat(item.a),
  brewery: item.m,
  is_draft: false,
  search_query: correlationPositionToSearchQuery[item.i] || replaceSearchQuery(item.t, item.s),
});

const save = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data), { encoding: "utf8" });

const onlyBeer = (item) =>
  !(item.title || "").toLowerCase().startsWith("бутылка");

(async () => {
  const beer = await getStock();
  const draft = beer.draft.map((item) => transformDraft(item));
  const bottles = beer.bottles.map((item) => transformBottle(item));
  const result = [].concat(draft).concat(bottles).filter(onlyBeer);
  save(config.output, result);
  console.log(`Saved ${result.length} items to ${config.output}`);
})();
