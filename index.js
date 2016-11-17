// simen@skye.no
var express     = require('express'); 
var requestify  = require('requestify');
var writeFile   = require('write');
var router      = express.Router();
var port        = process.env.PORT || 8080;
var app         = express();
var sapUrl      = "http://www.nettavisen.no";
var sapUrlGet   = "";  

router.use(function(req, res, next) {
    console.log("- New request -"); 
    console.log("request: " + sapUrlGet); 
    
    sapUrlGet = sapUrl + req.url;
    
    console.log("request: " + "/sport/fotball/disse-vinner-nettavisen-prisen-2016/3423283013.html");    
    requestify.get(sapUrlGet).then(function(response) {
        
        console.log("Server response"); 
        getBody(response);
      }
    );
    
    var path = (req.url).substr(1);
    
    console.log("path");
    
    function getBody(response){
        console.log("Started to write file"); 
        writeFile(path, response.body, function(err) {
          if (err){ 
              console.log(err);
          } else{ 
              res.send(response.body);
              console.log("file written"); 
          }
        });
    };
});

router.get('/', function(req, res) {
    res.json({ message: 'The API is alive' });   
});



app.use('/sapui5intercept', router);

app.listen(port);
console.log('SAPUI5 intercept running on port: ' + port);