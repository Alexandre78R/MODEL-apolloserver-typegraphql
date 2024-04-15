import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  import { ObjectType, Field, ID, InputType, Float } from "type-graphql";
  
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

@InputType()
export class UpdateFlagInput {
  @Field(() => ID)
  id: number;
  @Field()
  code: string;
  @Field()
  name: string;
  @Field()
  emoji: string;
  @Field()
  continent: string;
}