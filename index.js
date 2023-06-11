const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


// Middlewares here: 
app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e86npgm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const classCollections = client.db("bfmiDB").collection("class");
        const selectedClass = client.db("bfmiDB").collection("selectedClass");

        app.get('/classes', async(req, res) => {
            const result = await classCollections.find().toArray()
            res.send(result)
        })

        app.post('/selectedClass', async(req, res) => {
            const classes = req.body;
            console.log(classes);
            const result = await selectedClass.insertOne(classes)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('BFIM School server Running')
})

app.listen(port, () => {
    console.log(`BFMI School server running On port ${port}`)
})