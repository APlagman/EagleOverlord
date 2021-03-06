import { Message } from 'discord.js';
import { ClientSettings } from './settings';

export function handleCSC(message: Message, args: string[],
    settings: ClientSettings): void {
    if (args.length < 1) {
        message.channel.send(`Missing parameter. Use \`!help csc\` for more info.`);
        return;
    }

    const server = message.guild
        ? settings.servers.find(s => s.id == message.guild?.id)
        : null;
    if (!server) {
        message.channel.send(`This command requires a guild.`);
        return;
    }
    const member = message.guild?.member(message.author);
    const role = message.guild?.roles.cache.get(server.cscRole);
    switch (args[0].toLowerCase()) {
        case `info`:
            const cscGeneralChannel = message.guild?.channels.cache.get(server.cscGeneralChannel);
            message.channel.send(`CSC stands for Cyber Security Club. See ${cscGeneralChannel} for more info.`);
            return;
        case `join`:
            if (role && !member?.roles.cache.get(role.id)) {
                member?.roles.add(role);
                member?.send(`Welcome to the CSC!`);
            }
            break;
        case `leave`:
            if (role && member?.roles.cache.get(role.id)) {
                member?.roles.add(role);
                member?.send(`The CSC will miss you.`);
            }
            break;
    }
}