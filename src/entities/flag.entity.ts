import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  import { ObjectType, Field, ID, InputType, Float } from "type-graphql";
  import { Length } from "class-validator";
  
  @ObjectType()
  @Entity()
  export class Flag extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 2, unique: true })
    @Field()
    @Length(2, 2, { message: "The flag code is made up of 2 letters only" })
    code: string;
  
    @Column({ unique: true })
    @Field()
    name: string;
  
    @Column({ unique: true })
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