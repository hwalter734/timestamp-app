// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

function newDate() {
  return Date().toString();
};

function newDateUnix() {
  return newDate()/1000 | 0
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', function(req, res) {
  let currentDate = new Date();
  res.json({'unix': currentDate.getTime(), 'utc': currentDate.toUTCString()})
})

app.get('/api/timestamp/:date?', function(req, res) {
  let dateString = req.params.date;
  let numberUNIX = new Date(parseInt(dateString));
  if (parseInt(dateString) > 10000) {
    res.json({'unix': numberUNIX.getTime(), 'utc': numberUNIX.toUTCString()})
  }
  let inputValue = new Date(dateString);
  if (inputValue === "Invalid Date") {
    res.json({error: 'Invalid Date'});
  } else {
    res.json({
      'unix': inputValue.getTime(),
      'utc': inputValue.toUTCString()
    })
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT || 65427, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
