/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { SlashCommandBuilder } from "discord.js";

const roll = new SlashCommandBuilder().setName("roll").
  setDescription("Roll the dice!").
  addIntegerOption(
    (option) => {
      return option.setName("count").setDescription("How many dice to roll").
        setMinValue(1).
        setMaxValue(100).
        setRequired(true);
    },
  ).
  addStringOption(
    (option) => {
      return option.setName("die").setDescription("What kind of dice to roll.").
        setRequired(true).
        addChoices(
          [
            {
              name:  "d2",
              value: "2",
            },
            {
              name:  "d3",
              value: "3",
            },
            {
              name:  "d4",
              value: "4",
            },
            {
              name:  "d6",
              value: "6",
            },
            {
              name:  "d8",
              value: "8",
            },
            {
              name:  "d10",
              value: "10",
            },
            {
              name:  "d12",
              value: "12",
            },
            {
              name:  "d20",
              value: "20",
            },
            {
              name:  "d100",
              value: "100",
            },
          ],
        );
    },
  ).
  addNumberOption(
    (option) => {
      return option.setName("modifier").
        setDescription("What modifier to apply to the roll").
        setRequired(false);
    },
  ).
  addStringOption(
    (option) => {
      return option.setName("type").
        setDescription("What type of roll to perform").
        setRequired(true).
        addChoices(
          [
            {
              name:  "Normal Roll",
              value: "normal",
            },
            {
              name:  "Advantage Roll - roll twice and take the higher result",
              value: "advantage",
            },
            {
              name:  "Disadvantage Roll - roll twice and take the lower result",
              value: "disadvantage",
            },
          ],
        );
    },
  );

// eslint-disable-next-line no-console -- We only use this file to generate the command JSON for the Discord API.
console.log(JSON.stringify(roll.toJSON(), null, 2));
