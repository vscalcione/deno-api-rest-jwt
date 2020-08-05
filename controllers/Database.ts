import { Database } from 'https://deno.land/x/denodb/mod.ts';

import { User } from './models/index.ts';

export class DatabaseController {
    client: Database;

    constructor () {
        this.client = new Database('sqlite3', {
            filepath: Deno.realPathSync('./controllers/database/db.sqlite'),
        });
    }

    initModels () {
        this.client.link([User]);
        return this.client.sync({ drop: true });
    }
}