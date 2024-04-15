import { In, Repository } from "typeorm";
import { Flag, CreateFlagInput} from "../entities/flag.entity";
import datasource from "../libs/db";
import { validate } from "class-validator";

export default class FlagService {
  db: Repository<Flag>;
  constructor() {
    this.db = datasource.getRepository(Flag);
  }

  async list() {
    return await this.db.find();
  }


  async find(id: number) {
    return []
  }

  async create(data: CreateFlagInput) {
    const newFlag = this.db.create(data);
    return await this.db.save(newFlag);
  }

  async delete(id: number) {

  }

//   async update(id: number, data) {
//   }
}