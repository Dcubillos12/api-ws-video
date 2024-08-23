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
      const { phone , message} = req.body;     

      await bot.sendMessage(phone, message, {});
      res.end("Esto es del server polka");
    })
  );
  await createBot({
    database: new MemoryDB(),
    flow: createFlow([flowBienvenida]),
    provider,
  });
};
main();
