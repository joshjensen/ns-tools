/*
 * Copyright (c) 2015 Pixel Flavor LLC. All Rights Reserved.
 * Please see the LICENSE file included with this distribution for details.
 */

var program = require('commander');

var pjson = require('./../package.json');

program
  .version(pjson.version)
  .option('--css', 'Create CSS file only')
  .option('--js', 'Create JS file only')
  .option('--xml', 'Create XML file only')
  .option('--force-overwrite', 'Force overwrite existing files. !!USE WITH CAUTION!!')
  .arguments('<cmd> <subCmd> [param...]')
  .action(routeCommand);

program.parse(process.argv);

function routeCommand(cmd, subCmd, params, prog) {
	if (!/^[a-z]+$/i.test(cmd)) {
		console.error('Invalid command.');
		return;
	}

	if (!/^[a-z]+$/i.test(subCmd)) {
		console.error('Invalid sub-command.');
		return;
	}

	try {
		require('./commands/' + cmd)[subCmd].apply(null, arguments);
	} catch (e) {
		console.error(e);
	}
}