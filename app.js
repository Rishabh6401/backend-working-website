const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser= require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port = 8000;
// Define mongoose Schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });
  const Contact = mongoose.model('Contact', ContactSchema);
// EXPRESS SPECIFIC STUFF 
app.use("/static",express.static("static"))
app.use(express.urlencoded())
// PUG SPECIFIC STUFF 
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))
// ENDPOINTS
app.get("/", (req,res)=>{
    const params = {  }
    res.status(200).render('home.pug',params)
})
app.get("/contact", (req,res)=>{
    const params = {  }
    res.status(200).render('contact.pug',params)
})
app.get("/about", (req,res)=>{
    const params = {  }
    res.status(200).render('about.pug',params)
})
app.get("/classinfo", (req,res)=>{
    const params = {  }
    res.status(200).render('class.pug',params)
})
app.get("/services", (req,res)=>{
    const params = {  }
    res.status(200).render('services.pug',params)
})
app.post("/contact", (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Thank you!! your data is save in database")
    }).catch(()=>{
        res.status(400).send("Opps try again!! your data is not save in database")
    })
})
// START THE SERVER 
app.listen(port,()=>{
    console.log(`This port is run successfully on port ${port}`);
})