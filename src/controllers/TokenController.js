import Player from '../models/Player';
import jwt from 'jsonwebtoken';

class TokenController{
  async store(req, res){
    try{
      const { email = '', password = '' } = req.body;
      if(!email || !password){
        return res.json('Invalid credentials')
      }

      //se eu tiver mais de um personagem? talvez por um email + nome é melhor...
      //ou posso mostrar todos os personagens e mandar ele selecionar 1
      const player = await Player.findOne( { where: { email } } );

      if(!player){
        return res.json('Player not found');
      }

      if(!(await player.passwordValid(password))){
        return res.json('Wrong password');
      }

      const { id } = player;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION});

      return res.json({
        player: {id, name: player.name, email},
        token
      })
    }catch(e){
      return res.status(400).json('Something went wrong...');
    }
  }
}

export default new TokenController();
