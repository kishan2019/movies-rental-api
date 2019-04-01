const express = require("express");
var exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;


//connect to mongoose
mongoose.connect('mongodb://localhost/mydb',{
    useNewUrlParser:true
})
.then(() => console.log("mongodb connected..."))
.catch(err => console.log(err));


//Load Idea Model
require('./models/idea');
const Idea = mongoose.model('ideas');


//handle bar
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Index Routing
app.get('/',(req,res) =>{
  //  console.log(req.name);
  const title = "Rental ApI"
    res.render("index",{
        title : title
    });
});

// Routing about
app.get('/about',(req,res) => {
    res.render("about");
});

//how middlewarew work
app.use(function (req, res, next) {
    //console.log('Time:', Date.now())
    req.name = "kishan singh";
      next()
    });

   // add Idea form
   app.get('/ideas/add',(req,res) => {
       res.render('ideas/add');
   });

const port = 5000;

app.listen(port,() =>{
    console.log("server is running on port "+ port);
});
