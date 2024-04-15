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

  async findById(id: number) {
    return await this.db.findOne({ where: { id } });
  }

  async findByCode(code: string) {
    return await this.db.findOne({ where: { code } });
  }

  async findListByContinent(continent: string) {
    return await this.db.find({ where: { continent } });
  }

  async create(data: CreateFlagInput) {
    try {
        const newFlag = this.db.create(data);
        return await this.db.save(newFlag);
    } catch (err : any) {
        if (err.driverError.errno === 19) {
            throw new Error("Unable to create the flag, it already exists in our database");
        } else {
            throw new Error("Server error please check again later");
        }

    }
  }

  async delete(id: number) {
    const flagToDelete = await this.findById(id);
    if (!flagToDelete) {
        throw new Error("The flag does not exist");
    }
    return await this.db.remove(flagToDelete);
  }
}