import { MongoRepository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { ReportEntity } from './report.entity';

@EntityRepository(ReportEntity)
export class ReportRepository extends MongoRepository<ReportEntity> {}
