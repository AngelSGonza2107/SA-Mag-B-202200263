import { createApp } from "./app.js";

const rawPort = process.env.PORT ?? "3000";
const port = Number(rawPort);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`PORT inválido: ${rawPort}`);
}

createApp().listen(port, () => {
  console.log(`API de tienda disponible en http://localhost:${port}`);
});
