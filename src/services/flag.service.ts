import { In, Repository } from "typeorm";
import { Flag } from "../entities/flag.entity";
import datasource from "../libs/db";
import { validate } from "class-validator";

export default class FlagService {
  db: Repository<Flag>;
  constructor() {
    this.db = datasource.getRepository(Flag);
  }

  async list() {
    return []
  }


  async find(id: number) {
    return []
  }

//   async create(data: ) {
//   }

  async delete(id: number) {

  }

//   async update(id: number, data) {
//   }
}