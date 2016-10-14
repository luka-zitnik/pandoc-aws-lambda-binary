/*global module, require, console, Promise */
var childProcess = require('child_process'),
	execPromise = function (command) {
		'use strict';
		return new Promise(function (resolve, reject) {
			childProcess.exec(command, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},
	spawnPromise = function (command, input, args) {
		'use strict';
		return new Promise(function (resolve, reject) {
			var process = childProcess.spawn(command, args),
				output = '';
			process.stdout.on('data', function (buffer) {
				output += buffer.toString();
			});
			process.stdout.on('end', function () {
				resolve(output);
			});
			process.stdin.write(input);
			process.stdin.end();
		});
	};
module.exports = {
	exec: execPromise,
	spawn: spawnPromise
};
