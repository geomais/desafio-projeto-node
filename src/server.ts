import { app } from "./app";

const defaultPort = 3000;
const port = Number(process.env.PORT ?? defaultPort);

app.listen(port, (): void => {
  console.log(`GeoProjetoDigital API running on port ${port}`);
});
