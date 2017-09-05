var app= require ('express')();
var axios = require('axios');
var bodyParser = require('body-parser');

const BASE_URL = "https://andruxnet-random-famous-quotes.p.mashape.com";
const PORT = process.env.PORT || 8081;

app.use(require('cors')());
app.use( bodyParser.json()); 

var MakeRequest = (cat, count,res)=>{
    axios.get(`${BASE_URL}/?cat=${cat}&count=${count}`,
        {headers:{"X-Mashape-Key":""}})
        .then(response=>{
            res.json(response.data);
        });
};

app.route(['/GetQuotes'])
    .get((req,res)=>{
        MakeRequest(req.query.cat,req.query.count,res);
    })
    .post((req,res)=>{
        MakeRequest(req.body['cat'],req.body['count'] ,res);
    });

app.listen(PORT,()=>{
    console.log("Listening to ",PORT);
});
