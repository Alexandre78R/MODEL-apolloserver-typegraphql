import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  import { ObjectType, Field } from "type-graphql";
  import { Length } from "class-validator";
  
  @ObjectType()
  @Entity()
  export class Flag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 2 })
    @Length(2, 2, { message: "The flag code is made up of 2 letters only" })
    code: string;
  
    @Column()
    @Field()
    name: string;
  
    @Column()
    @Field()
    emoji: string;
  }