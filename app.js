var express = require('express');
var app = express();

const PORT = process.env.PORT || 80;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Exal Backend Restful Service!');
});

app.get('/sources/:title/', function (req, res) {
	let i;
	for (i=0; i<Source.length; i++) {
		// Handle undefined
		if (Source[i].Title.localeCompare(req.params.title)== 0) {
			res.json(Source[i]);
			break;
		}
	}
  res.json({"Message" : "Error: There is no source with the requested Title."});
});


app.listen(PORT, function () {
  console.log('Example app listening on port' + PORT + '!');
});
