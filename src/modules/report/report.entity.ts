import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'havesthistories' })
export class ReportEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  transactionHash: string;

  @Column()
  contractAddress: string;

  @Column('decimal')
  tokenAmount: number;

  @Column('decimal')
  goenAmount: number;

  @Column('timestamp')
  blockTime: number;
}
