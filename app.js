var express = require('express');
var app = express();

const { Client } = require('pg');

const connectionString = 'postgres://nqiqbdbukgygxb:cb3b5f7f38e2387e17257b6feebeb567d3d8932556f5943566b15ea590e6e5e9@ec2-54-228-251-254.eu-west-1.compute.amazonaws.com:5432/d2henp7bbv2obe'
	const client = new Client({
		connectionString: connectionString,
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


	res.send(answer);
});

app.listen(PORT, function () {
	console.log('Example app listening on port' + PORT + '!');
  });

