import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { UseDto } from '../../decorators/use-dto.decorator';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import type { UserDtoOptions } from './dto/user-dto';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true })
  email?: string;

  @Column()
  @Exclude()
  password?: string;

  @Column()
  phone?: string;

  @Column()
  avatar?: string;

  @VirtualColumn()
  fullName?: string;
}
