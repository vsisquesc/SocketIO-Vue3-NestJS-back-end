import { Entity, Column } from 'typeorm';

@Entity('Users')
export class User {
  @Column({ name: 'email', nullable: false, primary: true })
  email: string;
}
