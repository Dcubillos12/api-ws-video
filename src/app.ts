import {
  addKeyword,
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword("bienvenida").addAnswer(
  "Hola, bienvenido al chat de whatsapp"
);

const main = async () => {
  const provider = createProvider(BaileysProvider);
  provider.initHttpServer(3002);
  provider.http?.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const { phone, message } = req.body;

      try {
        // Verifica el método correcto para enviar mensajes
        // Aquí se usa un método ficticio `sendMessage` como ejemplo
        if (typeof bot.sendMessage === 'function') {
          await bot.sendMessage(phone, message, {
            
          });
        } else {
          throw new Error('No method available for sending messages');
        }
        res.end("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
      }
    })
  );

  await createBot({
    database: new MemoryDB(),
    flow: createFlow([flowBienvenida]),
    provider,
  });
};

main();
