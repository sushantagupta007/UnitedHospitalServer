const express = require('express')
const port = 5000
const app = express()

app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://united-hospital:rRc6LLNZfArV8F30@cluster0.rloca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const database = client.db("Hospital-Database");
    const services = database.collection("Services");
    const doctors = database.collection("Doctors")

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