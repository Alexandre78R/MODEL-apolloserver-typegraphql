import { createConnection } from "typeorm";
import { Flag } from "./entities/flag.entity";
import db from "./libs/db";
import fakeFlags from "./fakeData/fakeFlags";

async function migrate() {
    await db.initialize();

    //Migrate Flag
    await db.getRepository(Flag).clear();
    const userRepository = db.getRepository(Flag);
    await userRepository.save(fakeFlags);

    console.log("Succes migrate database !")
}

migrate().catch(console.error);
