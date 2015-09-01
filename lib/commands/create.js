/*
 * Copyright (c) 2015 Pixel Flavor LLC. All Rights Reserved.
 * Please see the LICENSE file included with this distribution for details.
 */

var fs = require('fs-sync');
var mkdir = require('mkdirp');

var cwd = process.cwd();
var appFolder = cwd + '/app/';

/* Public Functions */

exports.controller = function () {
	if (folderExists(appFolder)) {
		parsePaths.apply(null, arguments);
	} else {
		console.error('Error: It does not look like you are in a {N} project folder.');
	}
};

/* Private Functions */

function folderExists(folder) {
	return fs.exists(folder);
}

function createAssets(fullPath, program) {
	var foldersAsArray = fullPath.split('/');
	if (foldersAsArray.length > 0 && foldersAsArray[0] === '') {
		foldersAsArray.shift();
	}

	if (foldersAsArray.length === 0) {
		console.error('Invalid Folder');
		return;
	}

	var fileName = foldersAsArray.pop();
	var path = foldersAsArray.join('/') + '/';

	mkdir(appFolder + path, function(err) { 
		if (err) {
			console.error(err);
		} else {
			var createSpecificAssets = (program.js || program.css || program.xml);
			var forceOverwrite = program.forceOverwrite;
			var pathWithFilename = appFolder + path + fileName;

			if ((!fs.exists(pathWithFilename + '.js') || forceOverwrite) && (!createSpecificAssets || (createSpecificAssets && program.js))) {
				fs.write(pathWithFilename + '.js', '');
				console.log('Created: ' + path + fileName + '.js');
			} else {
				if (fs.exists(pathWithFilename + '.js')) {
					console.log('Exists: ' + path + fileName + '.js');	
				}	
			}

			if ((!fs.exists(pathWithFilename + '.css') || forceOverwrite) && (!createSpecificAssets || (createSpecificAssets && program.css))) {
				fs.write(pathWithFilename + '.css', '');
				console.log('Created: ' + path + fileName + '.css');
			} else {
				if (fs.exists(pathWithFilename + '.css')) {
					console.log('Exists: ' + path + fileName + '.css');	
				}
			}

			if ((!fs.exists(pathWithFilename + '.xml') || forceOverwrite) && (!createSpecificAssets || (createSpecificAssets && program.xml))) {
				fs.write(pathWithFilename + '.xml', '');
				console.log('Created: ' + path + fileName + '.xml');
			} else {
				if (fs.exists(pathWithFilename + '.xml')) {
					console.log('Exists: ' + path + fileName + '.xml');	
				}
			}								
		}
	});
}

function parsePaths(cmd, subCmd, params, program) {
	if (params.length > 0) {
		for (var i = params.length - 1; i >= 0; i--) {
			createAssets(params[i], program);
		}
	}
}