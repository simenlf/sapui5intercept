// simen@skye.no
var express     = require('express'); 
var requestify  = require('requestify');
var writeFile   = require('write');
var router      = express.Router();
var port        = process.env.PORT || 8080;
var app         = express();
var sapUrl      = "https://sapui5.hana.ondemand.com/resources";
var sapUrlGet   = "";  

router.use(function(req, res, next) {
    sapUrlGet = sapUrl + req.url;
    console.log("");
    console.log("- New request -"); 
    console.log("request: " + sapUrlGet); 

    requestify.get(sapUrlGet).then(function(response) {
        
        console.log("Server response"); 
        getBody(response);
      }
    );

    var path = "interceptedFiles" + req.url;
    
    console.log("path: " + path);
    
    function getBody(response){
        console.log("Started to write file"); 
        res.header(response.headers);
        writeFile(path, response.body, function(err) {
          if (err){ 
              console.log("error: " + err);
          } else{
              
              res.send(response.body);
              console.log("File written to the OS ok."); 
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