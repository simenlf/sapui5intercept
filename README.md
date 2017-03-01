# sapui5intercept

This script fetches all the relevant files from hanaondemand for a SAPUI5 application. There are many reasons why you might need this. Offline applications and maybe avoiding using the supportpackage system for updating SAPUI5.

PS: Use this with caution and you obviously need a SAP license to use SAP software. This is just for developers

simenlf[AT]gmail.com / simen[AT]skye.no

### Installation
Get the project, install the dependencies and start the server.
```sh
$ git clone https://github.com/simenlf/sapui5intercept.git
$ cd sapui5intercept
$ npm install
$ node index.js
```

### Preparing your SAPUI5 project
To fetch needed SAPUI5 libraries you need to run through your SAPUI5 application. Follow this step to prepare:
- Find src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js" in index.html and exchange the path with http://localhost:8080/sapui5intercept/sap-ui-core.js

### Get your local copy of SAPUI5
- Start a server from the same directory as the index.html. Python has a nice simple HTTP server:
```sh
$ python -m SimpleHTTPServer [port]
```
- Navigate your web browser to http://localhost:port and click through your web app to download necessary SAPUI5 files
- Downloaded files will be placed within the sapui5intercept directory
