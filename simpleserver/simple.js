const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();
//const ipfilter = require('express-ipfilter').IpFilter;

// Whitelist the following IPs
//const ips = ['127.0.0.1', '::1'];

//app.use(ipfilter(ips, {mode: 'allow'}));
app.use(express.json());
app.use(logger("combined"));
app.use(helmet());

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./log');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app
  .route("/save/:type/:date/:amount/:address")
  .get((req, res) => {
    const {params: {type, date, amount, address}} = req;
    var obj = {"Type" : type, "Date" : date, "Amount" : amount, "Address":address}
    console.log("new item", obj);

    var index = localStorage.getItem('index'+ type);
    if(index == null) index = 0;

    localStorage.setItem(type + index.toString(), JSON.stringify(obj));
    localStorage.setItem('index'+type,++index);
    console.log(index);
    console.log(type);

  })
app
  .route("/loadtotalresult/:type")
  .get((req, res) => {
    const {params: {type}} = req;
    var before = [];
    const count = 10;
    var index = localStorage.getItem('index'+ type);
    if(index == null) index = 0;

    var limit = index - count > 0 ? index - count : 0;

    for(j=index-1; j>=limit; j--){
        console.log('index: ', type+j);
        before.push(JSON.parse(localStorage.getItem(type+j)));
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
  .route("/loadranking/:type")
  .get((req, res) => {
    const {params: {type}} = req;
    var before = [];
    var after_sort = [];

    var index = localStorage.getItem('index'+ type);
    if(index == null) index = 0;

    var limit = index - 100 > 0 ? index - 100 : 0;

    for(j=index-1; j>=limit; j--){
        contents =localStorage.getItem(type+j);
        if(contents != null) before.push(JSON.parse(contents));
    }

    // console.log('index: ', index);
    console.log('before sort', before);

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
    console.log('rest api server for saving/loading logs');
  });