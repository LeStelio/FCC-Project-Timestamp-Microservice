// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// my code here ////////////////////////////////////////////
// to check if Unix
function isValidUnix(input) {
  const unixRegex = /^\d+$/
  return unixRegex.test(input);
}

app.get("/api/:date?", function (req, res) {
  let parameter = req.params.date;

  // if no parameter passed with /api
  if (!parameter) {
    // return current time
    res.json({
      unix: Date.now(),
      utc: new Date(Date.now()).toUTCString()
    });
  } else {
    // convert Unix parameter to Number type
    if (isValidUnix(parameter)) {
      parameter = Number(parameter);
    }
    try {
      let date = new Date(parameter)
      // return error if not a valid Date
      if (isNaN(date.getTime())) {
        res.json({ error: "Invalid date" });
      } else {
        // return timestamps
        res.json({
          unix: new Date(parameter).getTime(),
          utc: new Date(parameter).toUTCString()
        });
      }
    } catch (err) {
      console.error("Error: " + err.message);
    }
  }
});

////////////////////////////////////////////////////////////
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
