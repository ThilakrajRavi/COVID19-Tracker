var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/covidDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to CovidDb!'))
.catch(error => console.log(error.message));

var covidFormSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    symptoms: [String,String,String,String],
    description: String
});

var covidForm = mongoose.model("CovidFormCollection",covidFormSchema);

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000,function (req,res) { 
    console.log("COVID Server started...");
 });

app.get("/",function (req,res) { 
    res.render("index");
});

app.post("/",function (req,res) { 
    var name = req.body.username;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var desc = req.body.description;
    var symp = req.body.coronasym;

    console.log(symp);

    var newData = {
        name: name,
        email: email,
        mobile: mobile,
        symptoms: symp,
        description: desc
    };

    covidForm.create(newData,function (err,data) { 
        if(err){
            console.log("error");
        }
        else{
            console.log(newData);
            res.redirect("/");
        }
    });
});