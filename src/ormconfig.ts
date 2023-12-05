import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthenticationEntity } from './authentication/entities/authentication.entity';
import { GroupEntity } from './groups/entities/group.entity';
import { TaskEntity } from './tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  retryAttempts: 5,
  retryDelay: 3000,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [AuthenticationEntity, GroupEntity, TaskEntity],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    max: 30,
    pool: {
      max: 30,
      min: 2,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
    },
  },
  logging: true,
};
