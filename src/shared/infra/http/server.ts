import '../database';
import './websocket/client';
import './websocket/admin';

import { http, port } from "./http";
import connection from '../database/typeorm';

http.listen(port, async () => {
  await connection();

  console.log(`Server started on port: ${port}`);
});
