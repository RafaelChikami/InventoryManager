import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

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
            const classes = ['espadachim', 'arqueiro', 'mago', 'ladrao'];

            if(typeof value !== 'string') throw new Error('Invalid class');

            let valid = false;
            for(let i in classes){
              if(value.toLowerCase() === classes[i]) valid = true;
            }
            if(!valid){
              throw new Error(`Invalid class, try: ${classes.join(' ')}`);
            }
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
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email must be valid'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      raw_password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 100],
            msg: 'Password must have more than 5 characters'
          }
        }
      }
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async player => {
      if(player.raw_password){
        player.password = await bcrypt.hash(player.raw_password, 8);
      }
    });

    return this;
  }

  passwordValid(password){
    return bcrypt.compare(password, this.password);
  }
}
