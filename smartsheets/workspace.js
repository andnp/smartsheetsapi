var http = require('http');
var request = require('request');
var fs = require('fs');

var SMARTSHEET_URL = "https://api.smartsheet.com/2.0";

/**
 * @param  {Function} Callback that passes in the JSON blob containing a list of workspaces accessable to the user
 */
var getWorkspaces = function(onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err,data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/',
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
 * @param  {String} ID of the workspace to get the data for
 * @param  {Function} Callback that passes in the JSON blob containing the data for the requested workspace
 */
var getWorkspace = function(workspaceId, onComplete){
	fs.readFile('accesskeys.json', 'utf8', function(err, data){
		var ACCESS_TOKEN = JSON.parse(data).smartsheet.accesstoken;
		var options = {
			url: SMARTSHEET_URL + '/workspaces/' + workspaceId,
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
	getWorkspace: getWorkspace,
	getWorkspaces: getWorkspaces
}