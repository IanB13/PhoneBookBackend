const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://MOD:monkey123@phonebookbackend-3ovwl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("sample_geospatial").collection("shipwrecks");
  // perform actions on the collection object
  console.log(collection);
  client.close();
});