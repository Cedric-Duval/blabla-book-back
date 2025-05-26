import fs from 'node:fs';
import https from 'node:https';
import app from './app';
import 'dotenv/config';

const options = {
  key: fs.readFileSync(
    '/etc/letsencrypt/live/williamdodart-server.eddi.cloud/privkey.pem',
    'utf8',
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/williamdodart-server.eddi.cloud/fullchain.pem',
    'utf8',
  ),
};

const port = 443;

https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS démarré sur https://localhost:${port}`);
});
