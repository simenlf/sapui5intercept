// simen@skye.no
var express     = require('express');
var requestify  = require('requestify');
var writeFile   = require('write');
var fs          = require('fs');
var router      = express.Router();
var port        = process.env.PORT || 7000;
var app         = express();
var readdirp    = require('readdirp');
var sapUrl      = 'https://sapui5.hana.ondemand.com/resources/';
var txtFile     = 'getFiles.txt';
var sourceDir   = 'sapui5Library/library';

var paths = new Array();

function readLibrary() {
  readdirp(
      { root: sourceDir }, function(entry) {
        // Do not want DS_Store >:(
        if (entry.path.indexOf('DS_Store') > -1) {
          return;
        }

        console.log('Writing entry to array: ', entry.path);
        paths.push(entry.path);
      }, function (error, res) {
        writeToFile();
      });
}

function writeToFile() {
  fs.writeFileSync(txtFile, paths.join('\n'), function(error, data) {
    if (error) {
      console.log('Error writing url paths to file', error);
    }
  });

  getFiles();
}

function getFiles() {
  fs.readFileSync(txtFile).toString().split('\n').forEach(function (line){
      console.log("- New request -");
      console.log("request: " + sapUrl + line);

      requestify.get(sapUrl + line).then(function(response) {
          console.log('Server response');

          var path = 'interceptedFiles/' + line;
          getBody(response, path);
      }, function(error) {
            console.log('Error: ', error);
      });
  });
}

function getBody(response, path) {
  writeFile(path, response.body, function(error) {
    if (error){
        console.log("Error: " + error);
    } else {
        console.log("File written to the OS ok.");
    }
  });
}

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
app.use('/sapui5interceptdir', function(req, res, next) {
  readLibrary();
  res.send('Hello world!');
});

app.listen(port);
console.log('SAPUI5 intercept running on port: ' + port);
