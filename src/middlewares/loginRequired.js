import jwt from 'jsonwebtoken';
import Player from '../models/Player';

export default async (req, res, next) => {

  const { authorization } = req.headers;
  console.log();
  console.log(req.headers);
  console.log();

  if(!authorization){
    return res.status(400).json('You need to login');
  }

  const [, token] = authorization.split(' ');

  try{
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;
    const player = await Player.findOne({ where: { id, email } });

    if(!player){
      return res.status(400).json('Player not found');
    }

    req.playerId = id;
    req.playerEmail = email;
    return next();

  }catch(e){
    return res.status(401).json({
      errors: ['Token is expired or invalid']
    });
  }
}
