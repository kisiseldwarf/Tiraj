import 'dotenv/config';
import express from 'express';
import {InteractionResponseType, InteractionType,} from 'discord-interactions';
import {VerifyDiscordRequest} from './utils.js';
import {cleanWithdrawedNumbers, getRandom100Number, getWithdrawedNumbers, print} from './game.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'tiraj') {
      const withdrawedNumbers = getWithdrawedNumbers()
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `🎲 **${getRandom100Number()}** - Chiffres déjà tirés : [${withdrawedNumbers}]`,
        },
      });
    }

    if (name === 'clear') {
      console.log('clearing all withdrawed numbers...')
      cleanWithdrawedNumbers();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `**Tiraj** remis à zéro`
        }
      })
    }

    if (name === 'print') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: print()
        }
      })
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
