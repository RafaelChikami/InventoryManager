import Sequelize  from 'sequelize';
import databaseConfig from '../config/database';

import Player from '../models/Player';
import Inventory from '../models/Inventory';

const models = [Player, Inventory];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
