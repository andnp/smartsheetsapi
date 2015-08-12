/**
This is an abstraction layer to make all function accessable through a single import
*/
var sheet = require('./smartsheets/sheet');
var column = require('./smartsheets/column');
var workspace = require('./smartsheets/workspace');
var template = require('./smartsheets/template');
var row = require('./smartsheets/row');

module.exports = {
	getSheets: sheet.getSheets,
	getSheet: sheet.getSheet,
	createSheetInWorkspaceFromTemplate: sheet.createSheetInWorkspaceFromTemplate,
	getColumns: column.getColumns,
	getWorkspaces: workspace.getWorkspaces,
	getTemplates: template.getTemplates,
	getWorkspace: workspace.getWorkspace,
	getRow: row.getRow
};