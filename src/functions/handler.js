const glob = require('glob'),
	util = require('util'),
	fs = require('fs'),
	client = require('../index');

const globPromise = util.promisify(glob);

module.exports = async () => {
	//Events
	const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`, { absolute: true });
	eventFiles.map((value) => {
		require(value);
	});

	//Command
	const directories = fs.readdirSync('./src/commands/');
	console.log(`Loading a total of ${directories.length} categories.`);
	for (const dir of directories) {
		const commands = fs.readdirSync('./src/commands/' + dir + '/');
		for (const cmd1 of commands.filter((cmd) => cmd.split('.').pop() === 'js' && !cmd.startsWith('.'))) {
			const response = client.loadCommand('./commands/' + dir, cmd1);
			if (response) {
				console.log(response);
			}
		}
	}
};