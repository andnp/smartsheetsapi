var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

/**
 * @param  {String} The Id of the sheet where the row resides
 * @param  {String} The Id of the row that you wish to get data for
 * @param  {Function} Callback that passes in the returned JSON blob
 */
var getRow = function(sheetId, rowId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/sheets/' + sheetId + '/rows/' + rowId,
			headers:{
				'Authorization' : 'Bearer ' + ACCESS_TOKEN
			}
		}; 
		request(options, function(error, response, body){
			onComplete(JSON.parse(body));
		});
	});
}

module.exports = {
	getRow: getRow
}