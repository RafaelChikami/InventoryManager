import Sequelize, { Model } from 'sequelize';

export default class Player extends Model{
  static init(sequelize){
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate:{
          len: {
            args: [1, 255],
            msg: 'Name must have between 1 and 255 characters',
          }
        }
      },
      classe: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          classeValida(value){
            const classes = ['espachim', 'arqueiro', 'mago', 'ladrao'];

            if(typeof value !== 'string') throw new Error('Invalid class');

            for(let i in classes){
              if(value.toLowerCase() === classes[i]) return true;
            }

            throw new Error(`Invalid class, try: ${classes.join(' ')}`);
          },
        }
      },
      nivel: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: 'Your level can not be negative'
          }
        }
      },
      slots: {
        type: Sequelize.INTEGER,
        defaultValue: 6,
        validate: {
          min: {
            args: [1],
            msg: 'You must have a least 1 slot'
          }
        }
      }
    }, {
      sequelize,
    });

    return this;
  }
}
