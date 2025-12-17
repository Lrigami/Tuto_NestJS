import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // to connect to db

@Injectable()
// OnModuleInit is a method called when the module is initialised
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaPg(pool);
        super({adapter});
    }

    async onModuleInit() {
        await this.$connect(); // connect to db
    }
}
