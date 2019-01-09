const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./log');


// localStorage.setItem('myFirstKey', 'myFirstValue');
// console.log(localStorage.getItem('myFirstKey'));

app.use(bodyParser.json());
app.use(logger("combined"));

var index = 0


// GET /something?color1=red&color2=blue

// Then in express, the handler:

// app.get('/somthing',(req,res) => {
//     req.query.color1 === "red";  //true
//     req.query.color2 === "blue"; // true
// }

// https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=99999999999&apikey=3IZMXH4SJM5SMX68K7P8ZSMMFUS4SM1HPR
// });
app
  .route("/save/:date/:amount/:address")
  .get((req, res) => {
    const {params: {date, amount, address}} = req;
    var obj = {"Date" : date, "Amount" : amount, "Address":address}
    
    index = localStorage.getItem('index');
    if(index == null) index = 0; 
    
    localStorage.setItem(index.toString(), JSON.stringify(obj));
    localStorage.setItem('index',++index);
    console.log(index);
 
  })

//이더스캔 전체 불러옴 제이슨 형태로  
app
  .route("/load")
  .get((req, res) => {
    var before = [];
    var after_sort = [];
    var index = localStorage.getItem('index');
    if(index == null) return;

    var limit = index - 100 > 0 ? index - 100 : 0;

    for(j=index-1; j>=limit; j--){
        console.log(j)
        before.push(JSON.parse(localStorage.getItem(j)))    
    }
    
    console.log('index: ', index)
    console.log('before sort', before)
    after_sort = before.sort(function(a,b){
       return b['Amount'] - a['Amount']
    });

    if(index>5){
        res.send(after_sort.slice(0,5))
    }
    else{
        res.send(after_sort.slice(0,index))
    } 
  })

  const server = app.listen(3000, () => {
    console.log('http server for saving a few logs');
  });


