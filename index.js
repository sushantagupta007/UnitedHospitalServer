const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors')

const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/test', (req, res) => {
    res.send("Hello")
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:qU9j1Qy7EDSnmszf@cluster0.iamcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db("healthcity");
        const review = database.collection("review"); 
        const appointment = database.collection("appointment");
        // create a document to insert
        app.post('/review', async (req, res) => {
            const data = req.body
            console.log(data)
            const review = database.collection("review");
            const doc = {
                pname: data.patient,
                dname: data.doctor,
                rating:data.rating,
                review:data.review,
            }
            const result = await review.insertOne(doc);
            res.send(doc)
            
        })

        app.post('/appointment',async(req,res)=>{
            const appointmentInfo = req.body
            const appointment = database.collection("appointment");

            const doc = {
                Name: appointmentInfo.firstName, 
                Doctor: appointmentInfo.Doctor,
                Symptoms: appointmentInfo.symptoms,
                Department: appointmentInfo.Department,
                Phone: appointmentInfo.phone,
                Date:appointmentInfo.date
              }
              const result = await appointment.insertOne(doc);
              res.send(doc)
        })

        app.get('/appointment',async(req,res)=>{
            const appointmentInfo = appointment.find({})
            const appointmentArray = await appointmentInfo.toArray()
            res.send(appointmentArray)
        })

        app.get('/review',async(req,res)=>{
            const reviewPatient = review.find({})
        const reviewArray = await reviewPatient.toArray()
        res.send(reviewArray)
        })

        app.put('/review/:id',async(req,res)=>{
            const id= req.params.id
            const decision = req.body
            console.log(id)
          
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: decision
              };
              const result = await review.updateOne(filter, updateDoc, options);
              res.send(result)
        })
      
        app.delete('/appointment/:id',async(req,res)=>{
            const id = req.params.id
            console.log(id)
            const query = {_id: ObjectId(id) };
            const result = await appointment.deleteOne(query);
            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
              } else {
                console.log("No documents matched the query. Deleted 0 documents.");
              }
            console.log(id)
        })

        app.put('/appointment/:id',async(req,res)=>{
            const Decision = req.body
            const id= req.params.id
            console.log(Decision,id)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: false };
            const updateDoc = {
                $set: Decision
              }
            const result = await appointment.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


//user: healthCity
//pass : ss5VF6UJKYeWABMB

app.listen(port, () => {
    console.log("Listening Port", port)
})