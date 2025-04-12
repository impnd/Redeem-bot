const  { MessageFlags } = require('discord.js');

const fs = require('fs');
const path = require('path');

const codesFilePath = path.join(__dirname, '../../config/codes.json');

module.exports = async (interaction, client, handler) => {
  if (!interaction.isModalSubmit()) return;

  if (!interaction.customId.startsWith('addcode_modal_')) return;

  const rewardType = interaction.customId.split('_').at(-1);

  const reward = interaction.fields.getTextInputValue('reward_value');
  const code = interaction.fields.getTextInputValue('code') || Math.random().toString(36).slice(2, 10).toUpperCase();
  const maxUses = parseInt(interaction.fields.getTextInputValue('max_uses')) || 1;
  const perUserLimit = parseInt(interaction.fields.getTextInputValue('per_user_limit')) || 1;

  const rewardMap = {
    text: 1,
    link: 2,
    role: 3,
  };

  const type = rewardMap[rewardType];
  if (!type) {
    return interaction.reply({ content: '❌ Invalid reward type.', flags: MessageFlags.Ephemeral });
  }

  let codes = {};
  if (fs.existsSync(codesFilePath)) {
    try {
      codes = JSON.parse(fs.readFileSync(codesFilePath, 'utf8'));
    } catch (err) {
      return interaction.reply({ content: '❌ Failed to read codes file.', flags: MessageFlags.Ephemeral });
    }
  }

  if (codes[code]) {
    return interaction.reply({ content: '❌ Code already exists.', flags: MessageFlags.Ephemeral });
  }

  codes[code] = {
    used: false,
    type,
    data: reward,
    maxUses,
    perUserLimit,
    redeemers: {},
  };

  try {
    fs.writeFileSync(codesFilePath, JSON.stringify(codes, null, 2));
  } catch (err) {
    return interaction.reply({ content: '❌ Failed to write to codes file.', flags: MessageFlags.Ephemeral });
  }

  await interaction.reply({
    content: `✅ Code \`${code}\` created with type **${rewardType}**`,
    flags: MessageFlags.Ephemeral,
  });
};
