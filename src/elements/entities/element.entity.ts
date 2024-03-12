import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Elements')
export class Element {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'content', nullable: false })
  content: string;
  @Column({ name: 'sender', nullable: false })
  sender: string;
}
