var express = require('express');
var moment = require('moment');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/:date', function(req, res) {
  var date = req.params.date;
  var unix;
  var natural;

  if (!isNaN(date)) {
    unix = Number(date);
    natural = moment.utc(unix * 1000).format('MMMM D, YYYY');
  }
  else {
    if (moment.utc(date, 'MMMM D, YYYY').isValid()) {
      natural = date;
      unix = Number(moment.utc(natural, 'MMMM D, YYYY').format('X'));
    }
    else {
      unix = null;
      natural = null;
    }
  }

  res.json({unix: unix, natural: natural});
});

app.listen(port, console.log('Server is listening at port ' + port + '.'));
