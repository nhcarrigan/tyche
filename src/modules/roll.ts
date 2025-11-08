/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { randomInt } from "node:crypto";
import type { ChatInputCommandInteraction } from "discord.js";

/**
 * Rolls dice and returns the result.
 * @param interaction -- The interaction payload from the Discord API.
 */
export const roll
= async(interaction: ChatInputCommandInteraction): Promise<void> => {
  const count = interaction.options.getInteger("count", true);
  const die = interaction.options.getString("die", true);
  const sides = Number.parseInt(die, 10);
  const modifier = interaction.options.getNumber("modifier") ?? 0;
  const type = interaction.options.getString("type", true);

  const firstResult = Array.from({ length: count }, () => {
    return randomInt(1, sides + 1);
  });

  if (type === "normal") {
    const result = firstResult.reduce((a, b) => {
      return a + b;
    }, 0);
    await interaction.reply(`Rolled ${String(count)}d${die}${modifier >= 0
      ? `+${String(modifier)}`
      : String(modifier)}:
${firstResult.join(" + ")}
Modifier: ${modifier >= 0
  ? `+${String(modifier)}`
  : `-${String(modifier)}`}
Total: **${String(result + modifier)}**`);
    return;
  }

  const secondResult = Array.from({ length: count }, () => {
    return randomInt(1, sides + 1);
  });

  const firstTotal = firstResult.reduce((a, b) => {
    return a + b;
  }, 0);
  const secondTotal = secondResult.reduce((a, b) => {
    return a + b;
  }, 0);

  const result = type === "advantage"
    ? Math.max(firstTotal, secondTotal)
    : Math.min(firstTotal, secondTotal);

  await interaction.reply(`Rolled ${String(count)}d${die}${modifier >= 0
    ? `+${String(modifier)}`
    : String(modifier)} with ${type}:
${firstResult.join(" + ")}
${secondResult.join(" + ")}
Modifier: ${modifier >= 0
  ? `+${String(modifier)}`
  : String(modifier)}
Total: **${String(result + modifier)}**`);
};
