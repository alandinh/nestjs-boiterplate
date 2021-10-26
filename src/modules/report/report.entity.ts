import { Decimal128 } from 'bson';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'havest_histories' })
export class ReportEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Index({ unique: true })
  @Column({ name: 'transactionHash' })
  transactionHash: string;

  @Index()
  @Column({ name: 'contractAddress' })
  contractAddress: string;

  @Column({ name: 'tokenAmount' })
  tokenAmount: Decimal128;

  @Column({ name: 'goenAmount' })
  goenAmount: Decimal128;

  @Column({ name: 'blockTime' })
  blockTime: number;

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;
}
