// authentication.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authentication')
export class AuthenticationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @Column({ nullable: true })
  token: string;
}
