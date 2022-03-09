const express = require('express')
const port = process.env.PORT||5000
const app = express()

const cors = require('cors');
app.use(cors())


app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://united-hospital:rRc6LLNZfArV8F30@cluster0.rloca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const database = client.db("Hospital-Database");
    const services = database.collection("Services");
    const doctors = database.collection("Doctors"); 
    const maps = database.collection("Map");

    const haiku = database.collection("appointment");
    //For insert Document 


    //Service Collection
    app.get('/services',async(req,res)=>{
      const service =  services.find({});
      const serviceArray = await service.toArray(); 
      res.send(serviceArray)
    })

    //Doctors Collection
    app.get('/doctors',async(req,res)=>{
      const doctor = doctors.find({})
      const doctorArray = await doctor.toArray(); 
      res.send(doctorArray)
      console.log("hello")
    })

    app.get('/maps',async(req,res)=>{
      const map = maps.find({})
      const mapArray= await map.toArray()
      res.send(mapArray)
    })

    app.post('/appointment',async (req,res)=>{
      console.log(req.body)
    })
  } finally {
    // await client.close();
  }
}
run().catch();


app.listen(port,()=>{
    console.log("Listining",port)
})

//united-hospital 
//rRc6LLNZfArV8F30