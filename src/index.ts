/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { DiscordAnalytics } from "@nhcarrigan/discord-analytics";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { roll } from "./modules/roll.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

const analytics = new DiscordAnalytics(client, logger);

client.once(Events.ClientReady, () => {
  void logger.log("debug", "Authenticated with Discord.");
  analytics.startCron();
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  void roll(interaction);
});

await client.login(process.env.BOT_TOKEN ?? "");
instantiateServer();
