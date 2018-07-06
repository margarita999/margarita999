var express = require('express');
var app = express();

// Database
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

const PORT = process.env.PORT || 8081;

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

app.get('/test', function (req, res) {

	S1= new Shop ();
	S2= new Shop ();

	all= [];
	all.push(S1);
	all.push(S2);
	//b= storeShops(all);

	//all2= retrieveShops();

	//JSON.stringify(all2)

	for (let i=0; i<5; i++) {
		client.query("INSERT INTO public.shop (content) VALUES('AAABBBCCC');", (err, res) => {
			if (err) return;
		});
		client.end();
	}
	

  res.send("AAA");
});

app.listen(PORT, function () {
	console.log('Example app listening on port' + PORT + '!');
  });

Shop.count= 0;

function Shop () {
	this.ID= Shop.count;
	Shop.count++;
	this.AssistantID= "";
	this.username= "";
	this.password= "";
	this.name= "";
	this.companyRegistrationNumber= "";
	this.phoneNumber= "";
	this.email= "";
	this.address= "";
	this.typeOfPruducts= ""; //e.g. clothes, tech, ...
	this.language= "";
	this.keywords= [];
	this.picture= "";
}

Item.count= 0;

function Item () {
	this.ID= Item.count;
	Item.count++;
	this.ShopID= "";
	this.name= "";
	this.category= ""; //e.g. clothes, tech, ...
	this.description= "";
	this.size= "";
	this.year= "";
	this.keywords= [];
	this.picture= "";
}

Assistant.count= 0;

function Assistant () {
	this.ID= Assistant.count;
	Item.count++;
	this.fullName= "";
	this.username= "";
	this.password= "";
	this.dateOfBirth= "";
	this.phoneNumber= "";
	this.email= "";
	this.address= "";
	this.IBAN= "";
	this.operationLocation= ""; // e.g. Nicosia
	this.operationRange= ""; // e.g. 100 km
	this.language= "";
	this.picture= "";
}

// if (err) throw err;

function storeShops (allShops) {
	//client.connect();
	/*client.query("DELETE FROM shop;", (err, res) => {
		if (err) return "1";
	});
	client.end();*/
	for (let i= 0; i< /*allShops.length*/2; i++) {
		client.query("INSERT INTO public.shop (content) VALUES('HELLOO');", (err, res) => {
			if (err) return "2";
		});
	}
	client.end();
	return "0";
}

function storeItems (allItems) {
	client.connect();
	client.query("DELETE FROM Item;", (err, res) => {
		if (err) throw err;
	});
	for (let i= 0; i< allItems.length; i++) {
		client.query("INSERT INTO public.Item (content) VALUES('"+JSON.stringify(allItems[i])+"');", (err, res) => {
			if (err) throw err;
		});
	}
	client.end();
}

function storeAssistant (allAssistants) {
	client.connect();
	client.query("DELETE FROM Assistant;", (err, res) => {
		if (err) throw err;
	});
	for (let i= 0; i< allAssistants.length; i++) {
		client.query("INSERT INTO public.Assistant (content) VALUES('"+JSON.stringify(allAssistants[i])+"');", (err, res) => {
			if (err) throw err;
		});
	}
	client.end();
}

function retrieveShops () {
	//client.connect();
	allShops= [];
	client.query("SELECT content FROM public.shop;", (err, res) => {
		if (err) return "3";
		for (let row of res.rows) {
			allShops.push(JSON.parse(row));
		}
	});
	client.end();
	return allShops;
}

