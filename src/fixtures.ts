import { createConnection } from "typeorm";
import { Flag } from "./entities/flag.entity";
import db from "./libs/db";
import fakeFlags from "./fakeData/fakeFlags";

async function migrate() {
    await db.initialize();

    // Supprimer toutes les entrées de la table flags
    await db.getRepository(Flag).clear();

    // Réinitialiser l'auto-incrémentation de l'ID (Que sur SQLITE)
    await db.query('DELETE FROM sqlite_sequence WHERE name="flag"');

    //Insert new flags
    const userRepository = db.getRepository(Flag);
    await userRepository.save(fakeFlags);

    console.log("Succes migrate database !")
}

migrate().catch(console.error);
