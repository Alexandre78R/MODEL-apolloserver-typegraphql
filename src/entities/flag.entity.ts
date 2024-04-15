import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  import { ObjectType, Field, ID, InputType, Float } from "type-graphql";

  export type Continent = "Asia" | "Africa" | "North America" | "South America" | "Antarctica" | "Oceania" | "Europe";
  
  @ObjectType()
  @Entity()
  export class Flag extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 2, unique: true })
    @Field()
    code: string;
  
    @Column({ unique: true })
    @Field()
    name: string;
  
    @Column({ unique: true })
    @Field()
    emoji: string;

    @Column({ enum: ["Asia", "Africa", "North America", "South America", "Antarctica", "Oceania", "Europe"], })
    @Field()
    continent: string;
  }

@InputType()
export class CreateFlagInput {
  @Field()
  code: string;
  @Field()
  name: string;
  @Field()
  emoji: string;
  @Field()
  continent: string;
}

@InputType()
export class UpdateFlagInput {
  @Field(() => ID)
  id: number;
  @Field({ nullable: true })
  code: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  emoji: string;
  @Field({ nullable: true })
  continent: string;
}