import Database from "./database.mjs";

(async () => {
  const db = new Database('./beer.nedb');

  await db.prepare('position');

  const b = beers()

  await Promise.all(beers().map((beer) => db.updateOne(beer)))

  //await db.remove({position: {$gte: 0}})

  const d = (await db.find({})).map(i => i.position)

  console.log({ d });
})();

function beers() {
  return [
    {
      position: 1,
      type: "Фильтрованное пиво",
      country: null,
      price: 110,
      title: "Жигулевское (Бутлегер)",
      style: "International Pale Lager ",
      density: 11,
      alcohol: 4.5,
      brewery: "Hammer Mill",
      is_draft: true,
      search_query: "Жигулевское",
      untappd_alcohol: 4.5,
      untappd_title:
        "Zhigulevskoe Pivo (Жигулевское Пиво) Zhigulevskoe (Жигулевское)",
      untappd_brewery: "Zhigulevskoe Pivo (Жигулевское Пиво)",
      untappd_type: "Lager - Euro Pale",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-73467_b7079.jpeg",
      untappd_popularity: 2005,
      untappd_rating_score: 3.31486,
      untappd_rating_count: 1366,
      untappd_beer_url:
        "https://untappd.com/b/zhigulevskoe-pivo-zhigulevskoe-pivo-zhigulevskoe-zhigulevskoe/493849",
      untappd_brewery_url: "https://untappd.com/w/_/73467",
    },
    {
      position: 2,
      type: "Фильтрованное пиво",
      country: null,
      price: 118,
      title: "Первый Тайм (Брянск)",
      style: "International Pale Lager ",
      density: 10,
      alcohol: 3.8,
      brewery: "Артпиво",
      is_draft: true,
      search_query: "Первый Тайм",
      untappd_alcohol: 3.8,
      untappd_title: "Артпиво Первый тайм",
      untappd_brewery: "Артпиво",
      untappd_type: "Lager - Pale",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-451399_fe24b.jpeg",
      untappd_popularity: 5,
      untappd_rating_score: 0,
      untappd_rating_count: 5,
      untappd_beer_url: "https://untappd.com/b/artpivo-pervyj-tajm/4062107",
      untappd_brewery_url: "https://untappd.com/w/_/451399",
    },
    {
      position: 3,
      type: "Фильтрованное пиво",
      country: null,
      price: 118,
      title: "Московское",
      style: "International Pale Lager ",
      density: 12,
      alcohol: 5,
      brewery: "Бутлегер",
      is_draft: true,
      search_query: "Московское",
      untappd_alcohol: 5,
      untappd_title: "Hammermill Brewery (Бутлегер) Московское",
      untappd_brewery: "Hammermill Brewery (Бутлегер)",
      untappd_type: "Lager - Helles",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-402617_6a649.jpeg",
      untappd_popularity: 22,
      untappd_rating_score: 3.025,
      untappd_rating_count: 20,
      untappd_beer_url:
        "https://untappd.com/b/hammermill-brewery-butleger-moskovskoe/2868656",
      untappd_brewery_url: "https://untappd.com/w/_/402617",
    },
    {
      position: 4,
      type: "Фильтрованное пиво",
      country: null,
      price: 120,
      title: "Старовар Фирменное Светлое",
      style: "International Pale Lager ",
      density: 11,
      alcohol: 4.2,
      brewery: "Старовар",
      is_draft: true,
      search_query: "Старовар Фирменное Светлое",
      untappd_alcohol: 4.2,
      untappd_title: "Коломенская Пивоварня Староваръ Пильзенское",
      untappd_brewery: "Коломенская Пивоварня",
      untappd_type: "Pilsner - Czech",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-447236_8ebca.jpeg",
      untappd_popularity: 50,
      untappd_rating_score: 3.04302,
      untappd_rating_count: 43,
      untappd_beer_url:
        "https://untappd.com/b/kolomenskaya-pivovarnya-starovar-pilzenskoe/3483432",
      untappd_brewery_url: "https://untappd.com/w/_/447236",
    },
    {
      position: 5,
      type: "Фильтрованное пиво",
      country: null,
      price: 126,
      title: "Жигулевское (Брянск)",
      style: "International Pale Lager ",
      density: 11,
      alcohol: 4.5,
      brewery: "Артпиво",
      is_draft: true,
      search_query: "Жигулевское",
      untappd_alcohol: 4.5,
      untappd_title:
        "Zhigulevskoe Pivo (Жигулевское Пиво) Zhigulevskoe (Жигулевское)",
      untappd_brewery: "Zhigulevskoe Pivo (Жигулевское Пиво)",
      untappd_type: "Lager - Euro Pale",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-73467_b7079.jpeg",
      untappd_popularity: 2005,
      untappd_rating_score: 3.31486,
      untappd_rating_count: 1366,
      untappd_beer_url:
        "https://untappd.com/b/zhigulevskoe-pivo-zhigulevskoe-pivo-zhigulevskoe-zhigulevskoe/493849",
      untappd_brewery_url: "https://untappd.com/w/_/73467",
    },
    {
      position: 6,
      type: "Фильтрованное пиво",
      country: null,
      price: 133,
      title: "Жигулевское Воронеж",
      style: "International Pale Lager ",
      density: 11,
      alcohol: 4.3,
      brewery: "Рюген Пивоварня ",
      is_draft: true,
      search_query: "Жигулевское Воронеж",
      untappd_alcohol: 4.3,
      untappd_title: "Varnitsa (Варница) Жигулевское",
      untappd_brewery: "Varnitsa (Варница)",
      untappd_type: "Lager - Pale",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-109110_5b77a.jpeg",
      untappd_popularity: 727,
      untappd_rating_score: 2.70067,
      untappd_rating_count: 596,
      untappd_beer_url:
        "https://untappd.com/b/varnitsa-varnica-zhigulevskoe/922208",
      untappd_brewery_url: "https://untappd.com/w/_/109110",
    },
    {
      position: 7,
      type: "Фильтрованное пиво",
      country: null,
      price: 138,
      title: "Вятич Ячменное",
      style: "Munich Helles",
      density: 11,
      alcohol: 4.5,
      brewery: "Вятич",
      is_draft: true,
      search_query: "Вятич Ячменное",
      untappd_alcohol: 4.5,
      untappd_title: "Vyatich (Вятич) Vyatich Yachmennoe (Вятич Ячменное)",
      untappd_brewery: "Vyatich (Вятич)",
      untappd_type: "Lager - Euro Pale",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-30700_a3141.jpeg",
      untappd_popularity: 94,
      untappd_rating_score: 2.63816,
      untappd_rating_count: 76,
      untappd_beer_url:
        "https://untappd.com/b/vyatich-vyatich-vyatich-yachmennoe-vyatich-yachmennoe/2356571",
      untappd_brewery_url: "https://untappd.com/w/_/30700",
    },
    {
      position: 8,
      type: "Фильтрованное пиво",
      country: null,
      price: 149,
      title: "Чешский Лежак",
      style: "Czech Pale Lager",
      density: 10,
      alcohol: 4.3,
      brewery: "МПК",
      is_draft: true,
      search_query: "Чешский Лежак",
      untappd_alcohol: 4.3,
      untappd_title:
        "Moscow Brewing Company (Московская Пивоваренная Компания) Пятый Океан Чешский Лежак",
      untappd_brewery:
        "Moscow Brewing Company (Московская Пивоваренная Компания)",
      untappd_type: "Pilsner - Czech",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-MoskovskayaPivovarennayaKompaniya_7165.jpeg",
      untappd_popularity: 112,
      untappd_rating_score: 3.02921,
      untappd_rating_count: 89,
      untappd_beer_url:
        "https://untappd.com/b/moscow-brewing-company-moskovskaya-pivovarennaya-kompaniya-pyatyj-okean-cheshskij-lezhak/3358804",
      untappd_brewery_url: "https://untappd.com/w/_/7165",
    },
    {
      position: 9,
      type: "Фильтрованное пиво",
      country: null,
      price: 151,
      title: "Старовар Жигулевское",
      style: "International Pale Lager ",
      density: 11,
      alcohol: 4,
      brewery: "Старовар",
      is_draft: true,
      search_query: "Старовар Жигулевское",
      untappd_alcohol: 4,
      untappd_title: "Пивоварня Свежевъ Старовар",
      untappd_brewery: "Пивоварня Свежевъ",
      untappd_type: "Hefeweizen Light / Leicht",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-145743_ff4fc.jpeg",
      untappd_popularity: 6,
      untappd_rating_score: 0,
      untappd_rating_count: 6,
      untappd_beer_url:
        "https://untappd.com/b/pivovarnya-svezhev-starovar/2197663",
      untappd_brewery_url: "https://untappd.com/w/_/145743",
    },
    {
      position: 10,
      type: "Фильтрованное пиво",
      country: null,
      price: 155,
      title: "Немецкий Пилснер",
      style: "German Pils",
      density: 12,
      alcohol: 4.8,
      brewery: "МПК",
      is_draft: true,
      search_query: "Немецкий Пилснер",
      untappd_alcohol: 4.8,
      untappd_title: "Davidov (Частная Пивоварня Давыдов) Немецкий Пилзнер",
      untappd_brewery: "Davidov (Частная Пивоварня Давыдов)",
      untappd_type: "Pilsner - German",
      untappd_image:
        "https://untappd.akamaized.net/site/brewery_logos/brewery-260473_62657.jpeg",
      untappd_popularity: 7,
      untappd_rating_score: 0,
      untappd_rating_count: 6,
      untappd_beer_url:
        "https://untappd.com/b/davidov-chastnaya-pivovarnya-davydov-nemeckij-pilzner/3217474",
      untappd_brewery_url: "https://untappd.com/w/_/260473",
    },
  ];
}
