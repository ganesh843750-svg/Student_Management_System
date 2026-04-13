import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import 'dotenv/config'
const app = express()

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static('public'))


const dbname = 'school'
const url = process.env.MONGO_URL

let db

async function connectDB(){
    try{
        const client = new MongoClient(url)
        await client.connect()
        db = client.db(dbname)
        console.log("MongoDB Connected")
        startServer()
    }catch(err){
        console.log("DB Connection Faild", err)
    }
}


function startServer(){
    app.get('/',(req,resp)=>{
        resp.render('home')
    })
    app.get('/form',(req,resp)=>{
        resp.render('form')
    })
    app.get('/std_data', async(req,resp)=>{
        try{
            const students = await db.collection('students').find().toArray()
            resp.render('std_details',{students})
        }catch(err){
            console.log(err)
            resp.send('Error while loding student Information')
        }
    })
    app.post('/submit', async(req,resp)=>{
        try{
            const result = await db.collection('students').insertOne(req.body)
            if(result){
                resp.send('Data submitted successfully')
            }
            else{
                resp.send('Something went wrong')
            }
        }catch(err){
            console.log(err)
            resp.send('Error submitting data')
        }
    })
    app.post('/delete/:id', async (req, resp)=>{
        try{
            let id = req.params.id
            const result = await db.collection('students').deleteOne({
                _id: new ObjectId(id)
            })
            if(result.deletedCount === 1){
                resp.send("Deleted Sucessfully")
            }else{
                resp.send("Record Not found")
            }
        }catch(err){
            console.log(err)
            resp.send("Error while dleting")
        }
    })

    app.get('/edit/:id', async (req, resp)=>{
        console.log("Edit button Hit")
        
        try{
            let id = req.params.id
            const student = await db.collection('students').findOne({_id: new ObjectId(id)})
            console.log("student :", student)
            resp.render('edit',{ student })
        }catch(err){
            console.log(err)
            resp.send("Error while loading the edit page")
        }
    })

    app.post('/update/:id', async (req, resp) =>{
        try{
        let id = req.params.id
        const result = await db.collection('students').updateOne(
            {_id: new ObjectId(id)},
            {$set: req.body}
    )
    if( result.modifiedCount === 1){
        resp.send("Updated Successfully")
    }
    else{
        resp.send("No Chenges made")
    }
}catch(err){
    console.log(err)
    resp.send("Error While Updating")
}


    })
    const port = process.env.PORT || 3000
    app.listen(port,()=>{
        console.log(`Server runnning on http://localhost:${port}`)
    })
}

connectDB()

