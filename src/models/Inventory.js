import Sequelize, { Model } from 'sequelize';

export default class Inventory extends Model{
  static init(sequelize){
    super.init({
      slots: {
        type: Sequelize.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: 'Value must be higher than 0'
          }
        }
      },
      itens: {
        type: Sequelize.JSON,
        validate: {
          itensValida(value){
            if(value.itens.length > this.slots) throw new Error('Your inventory is full');
          },
        }
      },
      gold: {
        type: Sequelize.INTEGER,
      },
      player_id: {
        type: Sequelize.INTEGER,
      }
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models){
    this.belongsTo(models.Player, { foreignKey: 'player_id' });
  }
}
