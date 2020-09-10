const http = require('http')
const {MongoClient} = require('mongodb')
const server = http.createServer(async (req,res) => {
console.log(123);

	const uri = "mongodb://mongo/mydb";


    const client = new MongoClient(uri);
	client.connect((err,db) => {
	console.log(err);
	console.log(db)
		res.end('123321');
	})
}).listen(1234);
