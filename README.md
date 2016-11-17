# sapui5intercept

This script fetches all the relevant files from hanaondemand for a SAPUI5 application. There are many reasons why you might need this. Offline applications and maybe avoiding using the supportpackage system for updating SAPUI5.

Just exchange:
  src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
with this:
  src="http://host:8080/sapui5intercept/sap-ui-core.js""

PS: Use this with caution and you obviously need a SAP license to use SAP software. This is just for developers
