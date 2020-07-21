//  V A R I A B L E S
var express     =  require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    Company    = require('./mongoose'),
    cors        = require('cors'),
    cheerio     = require('cheerio'),
    request     = require('request');
    


const PORT = process.env.PORT || 8085;

// U S E  /  S E T T I N G S
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());


// F U N C T I O N S

function parse(url) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body);

        var count = 1;
        var localDat = {
            CIN:'',
            name:''
        }
        $('table td').each(function () {
            if(count===1){
                localDat.CIN = $(this).text().toString();
                ++count;
            }
            else if(count === 2){
                localDat.name = $(this).text();
                ++count;
            }
            else{
                count = 1;
                Company.create(localDat, function(err,db_response){
                    if(err)
                        console.log(err); 
                    else
                        console.log("db_res: ",db_response);
                });
                localDat.name='';
                localDat.CIN='';
            }
        });
    })
}

//R O U T E S
app.get("/",(req,res)=>{
    Company.find({},function(err,db_response){ //calling DB
        if(err)
            res.send("error encountered: "+err);
        else{
            res.send(db_response);
        }
    });
});

app.post("/",(req,res)=>{
    search = req.body.recData;
    console.log(search);
    parse(`https://www.zaubacorp.com/companysearchresults/${search}`);
    res.send("data received successfully");
});

//  S E R V E R
app.listen(PORT,()=>{
    console.log("server started");
})