import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import app from './app';

const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
};

const port = 443;

https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS démarré sur https://localhost:${port}`);
});
