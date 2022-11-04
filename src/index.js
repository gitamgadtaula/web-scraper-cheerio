const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;

const website = "https://ekantipur.com/";

try {
  axios(website).then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    let content = [];

    $("h1")
      .attr("data-type", "news")
      .each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");

        content.push({
          title,
          url
        });

        app.get("/", (req, res) => {
          res.json(content);
        });
      });
  });
} catch (error) {
  console.log(error, error.message);
}

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
