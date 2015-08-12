var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

/**
 * @param  {Function} Callback that returns a JSON blob containing all of the sheets owned by user
 */
var getSheets = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err,data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		};
		request(options, function(error, response, body){
			onComplete(JSON.parse(body).data);
		});
	});
};

/**
 * @param  {String} ID of the sheet to get data for
 * @param  {Function} Callback that returns a JSON blob containing the sheet information
 */
var getSheet = function(sheetId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets/' + sheetId,
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

/**
 * @param  {String} ID of the workspace where the sheet should reside
 * @param  {String} Name of the newly created sheet
 * @param  {String} ID of the template to be used when creating the sheet
 * @param  {Function} Callback that returns the error and response from API call
 */
var createSheetInWorkspaceFromTemplate = function(workspaceId, sheetName, templateId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/' + workspaceId + "/sheets/",
			method: 'POST',
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN,
				'Content-Type' : 'application/json'
			},
			json: {
				name: sheetName,
				fromId: templateId
			}

		}; 
		request(options, function(error, response, body){
			// TODO: pass in error and response to the callback function
			// onComplete(JSON.parse(body));
		});
	});
};

module.exports = {
	getSheets: getSheets,
	getSheet: getSheet,
	createSheetInWorkspaceFromTemplate: createSheetInWorkspaceFromTemplate
}