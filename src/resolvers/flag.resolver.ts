import { Arg, Mutation, Query, Resolver } from "type-graphql";
import FlagService from "../services/flag.service";
import { Flag, CreateFlagInput  } from "../entities/flag.entity";

@Resolver()
export class FlagResolver {
  @Query(()=> [Flag])
  async listFlags (){
    const flags = await new FlagService().list();
    // if ()
    return flags;
  }

  @Mutation(() => Flag)
  async createFlag(@Arg("data") data: CreateFlagInput) {
    const newFlag = await new FlagService().create(data);
    return newFlag;
  }

//   @Mutation(() => AdDeleted)
//   async deleteFlag(@Arg("id") id: string) {
//     return await new FlagService().delete(id);
//   }
}