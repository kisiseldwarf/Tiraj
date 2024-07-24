import {InteractionResponseType, InteractionType,} from 'discord-interactions';
import {resetTiraj, tiraj, getWithdrawedNumbers, printWithdrawedNumbers, gardaj, printTiraj, resetGardaj} from './core.js';
import {AutoRouter} from 'itty-router';
import {CLEARAJ, GARDAJ, PRINTAJ, PUGARDAJ, TIRAJ} from './commands.js';
import {verifyDiscordRequest} from "./utils.js";

/**
 * The core server that runs on a Cloudflare worker.
 */

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const router = AutoRouter();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post('/interactions', async (request, env) => {
  const { isValid, interaction } = await server.verifyDiscordRequest(
      request,
      env,
  );
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      case PRINTAJ.name.toLowerCase(): {
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: printTiraj()
          }
        })
      }
      case CLEARAJ.name.toLowerCase(): {
        console.log('clearing all withdrawed numbers...')
        resetTiraj();
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `**Tiraj** remis à zéro`
          }
        })
      }
      case TIRAJ.name.toLowerCase(): {
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `🎲 **${tiraj()}** \n${printTiraj()}`,
          },
        });
      }
      case GARDAJ.name.toLowerCase(): {
        const username = interaction.member.nick || interaction.member.user.global_name;
        const userId = interaction.member.user.id;
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content:  `🎲 **${gardaj(username, userId)}** \n${printTiraj()}`
          }
        })
      }
      case PUGARDAJ.name.toLowerCase(): {
        const userId = interaction.member.user.id;
        const username = interaction.member.nick || interaction.member.user.global_name;
        resetGardaj(userId);
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content:  `**${username}** remis à zéro \n${printTiraj()}`
          }
        })
      }
      default:
        return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
    }
  }

  console.error('Unknown Type');
  return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

const server = {
  verifyDiscordRequest,
  fetch: router.fetch,
};

export default server;
