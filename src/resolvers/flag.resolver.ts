import { Arg, Mutation, Query, Resolver } from "type-graphql";
import FlagService from "../services/flag.service";
import { Flag } from "../entities/flag.entity";

@Resolver()
export class FlagResolver {
  @Query(()=> [Flag])
  async listFlags (){
    const flags = await new FlagService().list();
    return flags;
  }

//   @Mutation(() => AdDeleted)
//   async deleteFlag(@Arg("id") id: string) {
//     return await new FlagService().delete(id);
//   }
}