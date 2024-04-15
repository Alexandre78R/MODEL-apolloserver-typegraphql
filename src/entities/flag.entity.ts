import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  import { ObjectType, Field , InputType, Float } from "type-graphql";
  import { Length } from "class-validator";
  
  @ObjectType()
  @Entity()
  export class Flag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 2 })
    @Field()
    @Length(2, 2, { message: "The flag code is made up of 2 letters only" })
    code: string;
  
    @Column()
    @Field()
    name: string;
  
    @Column()
    @Field()
    emoji: string;

    @Column()
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