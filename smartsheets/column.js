var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

/**
 * @param  {String} The ID of the sheet to grab the columns from
 * @param  {Function} Callback function that passes back the returned JSON blob
 */
var getColumns = function(sheetId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets/' + sheetId + "/columns/",
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
};

module.exports = {
	getColumns: getColumns
}