const Command = require('../../structures/Command');

class Dice extends Command {
	constructor(client) {
		super(client, {
			name: 'dice',
			aliases: ['dado'],
			description: 'Tira un dado',
		});
	}

	async run(channel) {
		const num = rollDice();
		this.client.say(channel, `You rolled a ${num}`).catch((err) => console.log(err));
	}
}

function rollDice() {
	const sides = 6;
	return Math.floor(Math.random() * sides) + 1;
}

module.exports = Dice;