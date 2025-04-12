const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js');
const devConfig = require('../config/devConfig.json');

module.exports = {
  data: {
    name: 'addcode',
    description: 'Create a new redeemable code using buttons',
  },

  run: async ({ interaction }) => {
    const userRoles = interaction.member.roles.cache;
    const allowedRoles = devConfig.roles;

    const hasAccess = allowedRoles.some(roleId => userRoles.has(roleId));
    if (!hasAccess) {
      return interaction.reply({
        content: '❌ You don’t have permission to use this command.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('Choose Reward Type')
      .setDescription('Click a button to select the reward type.')
      .setColor('Blue');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('reward_text')
        .setLabel('Text')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('reward_link')
        .setLabel('Link')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('reward_role')
        .setLabel('Role')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
      flags: MessageFlags.Ephemeral,
    });
  },

  options: {
    devOnly: true,
    deleted: false,
  },
};
