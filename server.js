// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  // Check if date is empty, if empty return today's date in unix and utc format
  if (!req.params.date) {
    var today = new Date();
    var unix = today.getTime();
    var utc = today.toUTCString();
    res.json({ unix: unix, utc: utc });
  } else {
    let date = req.params.date || new Date();

    // Check if date is in unix format
    if (date.match(/^\d+$/)) {
      date = new Date(parseInt(date));
    } else {
      date = new Date(date);
    }

    // Check if the input date string is invalid
    if (isNaN(date)) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
