var express = require('express');
var app = express();

const { Client } = require('pg');

	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

//client.connect();

const PORT = process.env.PORT || 80;


app.get('/', function (req, res) {
  res.send('Exal Backend Restful Service!');
});

var answer;

app.get('/test', function (req, res) {


	answer= "A ";

	client.connect();

	client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
		answer= "B";
		res.send(answer);
		if (err) answer= "AAA";
		for (let row of res.rows) {
			answer= answer + "1";
			answer= answer + JSON.stringify(row);
		}
		client.end();
	});


	res.send(process.env.DATABASE_URL);
});

app.listen(PORT, function () {
	console.log('Example app listening on port' + PORT + '!');
  });

