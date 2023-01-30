const util = require('util'),
	glob = require('glob');

const globPromise = util.promisify(glob);

module.exports = async () => {
	//Events
	const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`, {absolute: true});
	eventFiles.map((value) => {
		require(value);
	});
};