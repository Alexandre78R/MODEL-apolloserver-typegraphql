import { DataSource } from "typeorm";
export default new DataSource({
    type: "sqlite",
    database: "flags.sqlite",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: true,
  });