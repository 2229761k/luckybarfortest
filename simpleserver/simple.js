const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./log');

app.use(express.json());
app.use(logger("combined"));
app.use(helmet());

var index = 0

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app
  .route("/save/:date/:amount/:address")
  .get((req, res) => {
    const {params: {date, amount, address}} = req;
    var obj = {"Date" : date, "Amount" : amount, "Address":address}
    console.log("new item", obj);

    index = localStorage.getItem('index');
    if(index == null) index = 0;

    localStorage.setItem(index.toString(), JSON.stringify(obj));
    localStorage.setItem('index',++index);
    console.log(index);

  })

app
  .route("/loadtotalresult")
  .get((req, res) => {
    var before = [];

    var index = localStorage.getItem('index');
    if(index == null) return;

    var limit = index - 100 > 0 ? index - 100 : 0;

    for(j=index-1; j>=limit; j--){
        before.push(JSON.parse(localStorage.getItem(j)));
    }

    // console.log('index: ', index);
    // console.log('before sort', before.slice(0,5));

    if(index>5){
        res.send(before.slice(0,5));
    }
    else{
        res.send(before.slice(0,index));
    }
  })

  app
  .route("/loadranking")
  .get((req, res) => {
    var before = [];
    var after_sort = [];

    var index = localStorage.getItem('index');
    if(index == null) return;

    var limit = index - 100 > 0 ? index - 100 : 0;

    for(j=index-1; j>=limit; j--){

        before.push(JSON.parse(localStorage.getItem(j)));
    }

    // console.log('index: ', index);
    // console.log('before sort', before);

    after_sort = before.sort(function(a,b){
       return b['Amount'] - a['Amount'];
    });

    if(index>5){
        res.send(after_sort.slice(0,5));
    }
    else{
        res.send(after_sort.slice(0,index));
    }
  })

  const server = app.listen(3000, () => {
    console.log('http server for saving a few logs');
  });