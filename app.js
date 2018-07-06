var express = require('express');
var app = express();

//client.connect();

const PORT = process.env.PORT || 80;


app.get('/', function (req, res) {
  res.send('Exal Backend Restful Service!');
});


app.get('/test', function (req, res) {


	answer= "A ";

	const { Client } = require('pg');

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

	client.connect();

	client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
	if (err) answer= "AAA";
	for (let row of res.rows) {
		answer= answer + JSON.stringify(row);
	}
	client.end();
	});


	res.send(answer);
});

app.listen(PORT, function () {
	console.log('Example app listening on port' + PORT + '!');
  });

