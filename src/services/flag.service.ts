import { In, Repository } from "typeorm";
import { Flag, CreateFlagInput, UpdateFlagInput } from "../entities/flag.entity";
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
      let errorMessage = err.sqlMessage || err.message;
      if (err.code === 'SQLITE_CONSTRAINT' && errorMessage.includes('CHECK constraint failed:')) {
        errorMessage = "Please choose between 7 continents: Asia | Africa | North America | South America | Antarctica | Oceania | Europe";
      } else if (err.code === 'SQLITE_CONSTRAINT' && errorMessage.includes('UNIQUE constraint failed:')) {
        errorMessage = "Unable to create the flag, it already exists in our database";
      } else {
        errorMessage = "Server error please check again later";
      }
      throw new Error(errorMessage);
    }
  }

  async delete(id: number) {
    const flagToDelete = await this.findById(id);
    if (!flagToDelete) {
        throw new Error("The flag does not exist");
    }
    return await this.db.remove(flagToDelete);
  }

  async update(id: number, data : Omit<UpdateFlagInput, "id">) {
    const flagToUpdate = await this.findById(id);
    if (!flagToUpdate) {
        throw new Error("The flag does not exist");
    }
    try {
        const flagToSave = this.db.merge(flagToUpdate, {
            ...data,
          });
        return await this.db.save(flagToSave);
    } catch (err: any) {
      let errorMessage = err.sqlMessage || err.message;
      if (err.code === 'SQLITE_CONSTRAINT' && errorMessage.includes('CHECK constraint failed:')) {
        errorMessage = "Please choose between 7 continents: Asia | Africa | North America | South America | Antarctica | Oceania | Europe";
      } else if (err.code === 'SQLITE_CONSTRAINT' && errorMessage.includes('UNIQUE constraint failed:')) {
        errorMessage = "Unable to create the flag, it already exists in our database";
      } else {
        errorMessage = "Server error please check again later";
      }
      throw new Error(errorMessage);
    }
  }
}