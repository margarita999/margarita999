var express = require('express');
var app = express();

// Database
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://nqiqbdbukgygxb:cb3b5f7f38e2387e17257b6feebeb567d3d8932556f5943566b15ea590e6e5e9@ec2-54-228-251-254.eu-west-1.compute.amazonaws.com:5432/d2henp7bbv2obe';
/*
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

//client.connect();
*/

// Accepting POST Parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

// Retreive Data from Database again in case of external change
app.get('/refresh', async function (req, res) {
	firstTime= true;
	answer= await init ();

	res.json({"Message" : "Success"});
  });

app.post('/add/shop', async function (req, res) {
	answer= await init ();
	shop= new Shop ();

	shop.AssistantID= req.body.AssistantID;
	shop.username= req.body.username;
	shop.password= req.body.password;
	shop.name= req.body.name;
	shop.companyRegistrationNumber= req.body.companyRegistrationNumber;
	shop.phoneNumber= req.body.phoneNumber;
	shop.email= req.body.email;
	shop.address= req.body.address;
	shop.typeOfPruducts= req.body.typeOfPruducts;
	shop.language= req.body.language;
	shop.keywords= req.body.keywords;
	shop.picture= req.body.picture;

	allShops.push(shop);

	answer= await deleteAllShopsDB ();
	answer= await storeShopsDB (allShops);

	res.json({"Message" : "Success"});
});

app.post('/add/item', async function (req, res) {
	answer= await init ();
	item= new Item ();

	item.ShopID= req.body.ShopID;
	item.name= req.body.name;
	item.category= req.body.category;
	item.description= req.body.description;
	item.size= req.body.size;
	item.year= req.body.year;
	item.keywords= req.body.keywords;
	item.picture= req.body.picture;

	allItems.push(item);

	answer= await deleteAllItemsDB ();
	answer= await storeItemsDB (allItems);

	res.json({"Message" : "Success"});
});

app.post('/add/assistant', async function (req, res) {
	answer= await init ();
	assistant= new Assistant ();

	assistant.fullName= req.body.fullName;
	assistant.username= req.body.username;
	assistant.password= req.body.password;
	assistant.dateOfBirth= req.body.dateOfBirth;
	assistant.phoneNumber= req.body.phoneNumber;
	assistant.email= req.body.email;
	assistant.address= req.body.address;
	assistant.IBAN= req.body.IBAN;
	assistant.operationLocation= req.body.operationLocation;
	assistant.operationRange= req.body.operationRange;
	assistant.language= req.body.language;
	assistant.picture= req.body.picture;

	allAssistants.push(assistant);

	answer= await deleteAllAssistantsDB ();
	answer= await storeAssistantsDB (allAssistants);

	res.json({"Message" : "Success"});
});

app.get('/all/shops/', async function (req, res) {
	answer= await init ();
	res.json(allShops);
});

app.get('/all/items/', async function (req, res) {
	answer= await init ();
	res.json(allItems);
});

app.get('/all/assistants/', async function (req, res) {
	answer= await init ();
	res.json(allAssistants);
});

app.get('/all/shops/name-id', async function (req, res) {
	answer= await init ();

	shops= [];
	for (let i= 0; i< allShops.length; i++) {
		s= {};
		s.name= allShops[i].name;
		s.ID= allShops[i].ID;
		shops.push(s);
	}

	res.json(shops);
});

app.get('/all/assistants/fullname-username-id', async function (req, res) {
	answer= await init ();

	assistants= [];
	for (let i= 0; i< allAssistants.length; i++) {
		a= {};
		a.fullName= allAssistants[i].fullName;
		a.username= allAssistants[i].username;
		a.ID= allAssistants[i].ID;
		assistants.push(a);
	}

	res.json(assistants);
});

/*
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
*/

app.get('/test', async function (req, res) {

	answer= await init ();
	//allShops= await retrieveShopsDB ();
	//allItems= await retrieveItemsDB ();
	//allAssistants= await retrieveAssistantsDB ();

	S1= new Shop ();
	S2= new Shop ();
	allShops.push(S1);
	allShops.push(S2);

	I1= new Item ();
	I2= new Item ();
	allItems.push (I1);
	allItems.push (I2);

	A1= new Assistant ();
	A2= new Assistant ();
	allAssistants.push (A1);
	allAssistants.push (A2);

	answer= await deleteAllShopsDB ();
	answer= await storeShopsDB (allShops);
	answer= await deleteAllItemsDB ();
	answer= await storeItemsDB (allItems);
	answer= await deleteAllAssistantsDB ();
	answer= await storeAssistantsDB (allAssistants);
  	res.json(answer);
});

/*
app.get('/db', async function (req, res) {
  	res.send(connectionString);
});
*/

app.listen(PORT, function () {
	console.log('Example app listening on port' + PORT + '!');
});

var firstTime= true;
var shopCount= 0;
var itemCount= 0;
var assistantCount= 0;
var allShops= [];
var allItems= [];
var allAssistants= [];

async function init () {
	if (firstTime== false) {
		return 0;
	}

	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	res = await client.query("SELECT content FROM public.shop;");
	shopCount= res.rows.length;

	res = await client.query("SELECT content FROM public.item;");
	itemCount= res.rows.length;

	res = await client.query("SELECT content FROM public.assistant;");
	assistantCount= res.rows.length;
	
	await client.end();

	allShops= await retrieveShopsDB();
	allItems= await retrieveItemsDB();
	allAssistants= await retrieveAssistantsDB();
	
	firstTime= false;
	return 0;
}

function Shop () {
	this.ID= shopCount++;
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

function Item () {
	this.ID= itemCount++;
	this.ShopID= "";
	this.name= "";
	this.category= ""; //e.g. clothes, tech, ...
	this.description= "";
	this.size= "";
	this.year= "";
	this.keywords= [];
	this.picture= "";
}

function Assistant () {
	this.ID= assistantCount++;
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

// Shop Functions -------------------------

async function storeShopsDB (allShops) {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect()
	
	for (let i= 0; i< allShops.length; i++){
		val= JSON.stringify(allShops[i]);
		//console.log(val);
		res = await client.query("INSERT INTO public.shop (content) VALUES('"+ val +"');");
	}
	//console.log(res.rows[0].message) 
	await client.end();

	return 0;
}

async function deleteAllShopsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("DELETE FROM shop;");
	await client.end();

	return 0;
}

async function retrieveShopsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("SELECT content FROM public.shop;");

	allShops= [];
	for (let i= 0; i< res.rows.length; i++) {
		//console.log(res.rows[i].content);
		allShops.push(JSON.parse(res.rows[i].content));
	}
	await client.end();

	return allShops;
}

// Item Functions -------------------------

async function storeItemsDB (allItems) {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect()
	
	for (let i= 0; i< allItems.length; i++){
		val= JSON.stringify(allItems[i]);
		//console.log(val);
		res = await client.query("INSERT INTO public.item (content) VALUES('"+ val +"');");
	}
	//console.log(res.rows[0].message) 
	await client.end();

	return 0;
}

async function deleteAllItemsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("DELETE FROM item;");
	await client.end();

	return 0;
}

async function retrieveItemsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("SELECT content FROM public.item;");

	allItems= [];
	for (let i= 0; i< res.rows.length; i++) {
		//console.log(res.rows[i].content);
		allItems.push(JSON.parse(res.rows[i].content));
	}
	await client.end();

	return allItems;
}

// Assistant Functions -------------------------

async function storeAssistantsDB (allAssistants) {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect()
	
	for (let i= 0; i< allAssistants.length; i++){
		val= JSON.stringify(allAssistants[i]);
		//console.log(val);
		res = await client.query("INSERT INTO public.assistant (content) VALUES('"+ val +"');");
	}
	//console.log(res.rows[0].message) 
	await client.end();

	return 0;
}

async function deleteAllAssistantsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("DELETE FROM assistant;");
	await client.end();

	return 0;
}

async function retrieveAssistantsDB () {
	client = new Client({
		connectionString: connectionString,
		ssl: true,
	});

	await client.connect();
	
	const res = await client.query("SELECT content FROM public.assistant;");

	allAssistants= [];
	for (let i= 0; i< res.rows.length; i++) {
		//console.log(res.rows[i].content);
		allAssistants.push(JSON.parse(res.rows[i].content));
	}
	await client.end();

	return allAssistants;
}


