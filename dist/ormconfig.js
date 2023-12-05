"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const authentication_entity_1 = require("./authentication/entities/authentication.entity");
const group_entity_1 = require("./groups/entities/group.entity");
const task_entity_1 = require("./tasks/entities/task.entity");
exports.typeOrmConfig = {
    retryAttempts: 5,
    retryDelay: 3000,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [authentication_entity_1.AuthenticationEntity, group_entity_1.GroupEntity, task_entity_1.TaskEntity],
    synchronize: true,
    autoLoadEntities: true,
    extra: {
        max: 30,
    },
    logging: true,
};
//# sourceMappingURL=ormconfig.js.map