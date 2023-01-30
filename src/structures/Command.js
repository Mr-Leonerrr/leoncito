/**
 * @class Command
 * @property {Leoncito} client
 * @property {Object} config
 * @property {Boolean} config.enabled
 * @property {Boolean} config.dmResolvable
 * @property {Boolean} config.args
 * @property {Boolean} config.ownerOnly
 * @property {Object} help
 * @property {String} help.name
 * @property {String} help.description
 * @property {String[]} help.aliases
 */
class Command {
	constructor(client, { name, aliases, description, enabled, dmResolvable, args, ownerOnly }) {
		this.client = client;
		this.config = {
			enabled: enabled || true,
			dmResolvable: dmResolvable || false,
			args: args || false,
			ownerOnly: ownerOnly || false,
		};
		this.help = {
			name: name,
			description: description,
			aliases: aliases || [],
		};
	}
}

module.exports = Command;