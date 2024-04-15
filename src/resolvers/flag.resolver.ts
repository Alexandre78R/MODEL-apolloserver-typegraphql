import { Arg, Mutation, Query, Resolver } from "type-graphql";
import FlagService from "../services/flag.service";
import { Flag, CreateFlagInput, UpdateFlagInput} from "../entities/flag.entity";

@Resolver()
export class FlagResolver {

  @Query(()=> [Flag])
  async listFlags (){
    const flags = await new FlagService().list();
    return flags;
  }

  @Query(()=> Flag)
  async flagByCode (@Arg("code") code: string){
    const flag = await new FlagService().findByCode(code);
    return flag;
  }

  @Query(()=> [Flag])
  async listFlagsByContinent (@Arg("continent") continent: string){
    const flags = await new FlagService().findListByContinent(continent);
    return flags;
  }

  @Mutation(() => Flag)
  async createFlag(@Arg("data") data: CreateFlagInput) {
    const newFlag = await new FlagService().create(data);
    return newFlag;
  }

  @Mutation(() => Flag)
  async deleteFlag(@Arg("id") id: string) {
    return await new FlagService().delete(+id);
  }

  @Mutation(() => Flag)
  async updateFlag(@Arg("data") data: UpdateFlagInput) {
    const { id, ...outherData } = data;
    return await new FlagService().update(+id, outherData);
  }
}