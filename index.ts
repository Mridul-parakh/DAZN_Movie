var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
const cors=require('cors');
var movies_routes=require('./routes/index.ts');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());
app.use('/',movies_routes);

const db = 'mongodb://localhost:27017/movies';
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(console.log('MongoDB connected'))
  .catch((err:any) => console.log(err)); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server runs at port ${PORT}`);
});
module.exports=app
