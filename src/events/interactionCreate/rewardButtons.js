const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;
  let modal;
  let rewardType;

  switch (interaction.customId) {
    case 'reward_text':
      rewardType = 'text';
      modal = new ModalBuilder()
        .setCustomId('addcode_modal_text')
        .setTitle('Add Text Reward')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('reward_value')
              .setLabel('Text')
              .setPlaceholder('e.g., Thanks for using this code!')
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('code')
              .setLabel('Custom Code (optional)')
              .setPlaceholder('Leave empty for random')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('max_uses')
              .setLabel('Max Uses (default: 0 = unlimited)')
              .setPlaceholder('e.g., 10')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('per_user_limit')
              .setLabel('Per User Limit (default: 1)')
              .setPlaceholder('e.g., 1')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          )
        );
      break;

    case 'reward_link':
      rewardType = 'link';
      modal = new ModalBuilder()
        .setCustomId('addcode_modal_link')
        .setTitle('Add Link Reward')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('reward_value')
              .setLabel('Link')
              .setPlaceholder('e.g., https://example.com/reward')
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('code')
              .setLabel('Custom Code (optional)')
              .setPlaceholder('Leave empty for random')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('max_uses')
              .setLabel('Max Uses (default: 0 = unlimited)')
              .setPlaceholder('e.g., 5')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('per_user_limit')
              .setLabel('Per User Limit (default: 1)')
              .setPlaceholder('e.g., 1')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          )
        );
      break;

    case 'reward_role':
      rewardType = 'role';
      modal = new ModalBuilder()
        .setCustomId('addcode_modal_role')
        .setTitle('Add Role Reward')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('reward_value')
              .setLabel('Role ID')
              .setPlaceholder('Paste the Role ID here')
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('code')
              .setLabel('Custom Code (optional)')
              .setPlaceholder('Leave empty for random')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('max_uses')
              .setLabel('Max Uses (default: 0 = unlimited)')
              .setPlaceholder('e.g., 2')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('per_user_limit')
              .setLabel('Per User Limit (default: 1)')
              .setPlaceholder('e.g., 1')
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          )
        );
      break;

    default:
      return;
  }

  await interaction.showModal(modal);
};
