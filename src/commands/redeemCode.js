const fs = require('fs');
const path = require('path');
const { MessageFlags } = require('discord.js');
const rewards = require('../config/codes.json');

module.exports = {
  data: {
    name: 'redeem',
    description: 'Redeem a reward code',
    options: [
      {
        name: 'code',
        description: 'The code you want to redeem',
        type: 3, // STRING
        required: true,
      },
    ],
  },

  run: async ({ interaction }) => {
    const code = interaction.options.getString('code').trim();
    const userId = interaction.user.id;

    if (!rewards[code]) {
      return interaction.reply({ content: '❌ Invalid code.', flags: MessageFlags.Ephemeral });
    }

    const reward = rewards[code];
    const totalUses = Object.keys(reward.redeemers).length;

    if (reward.maxUses > 0 && totalUses >= reward.maxUses) {
      return interaction.reply({ content: '❌ This code has reached its max uses.', flags: MessageFlags.Ephemeral });
    }

    if (reward.perUserLimit > 0 && (reward.redeemers[userId] || 0) >= reward.perUserLimit) {
      return interaction.reply({ content: '❌ You already redeemed this code the maximum number of times.', flags: MessageFlags.Ephemeral });
    }

    // Apply reward
    if (reward.type === 1) {
      await interaction.reply({ content: `✅ Reward: \`${reward.data || 'No data'}\``, flags: MessageFlags.Ephemeral });
    } else if (reward.type === 2) {
      await interaction.reply({ content: `✅ Link: ${reward.data}`, flags: MessageFlags.Ephemeral });
    } else if (reward.type === 3) {
      const role = interaction.guild.roles.cache.get(reward.data);
      if (!role) {
        return interaction.reply({ content: '❌ Role not found in this server.', flags: MessageFlags.Ephemeral });
      }

      try {
        await interaction.member.roles.add(role);
        await interaction.reply({ content: `✅ Role "${role.name}" has been assigned to you.`, flags: MessageFlags.Ephemeral });
      } catch (err) {
        return interaction.reply({ content: '❌ Failed to assign role. Check bot permissions.', flags: MessageFlags.Ephemeral });
      }
    }

    // Update redeemer data
    if (!reward.redeemers[userId]) reward.redeemers[userId] = 0;
    reward.redeemers[userId] += 1;

    if (reward.maxUses === 1) reward.used = true;

    fs.writeFileSync(
      path.join(__dirname, '../config/codes.json'),
      JSON.stringify(rewards, null, 2)
    );
  },

  options: {
    devOnly: true,
    deleted: false,
  },
};
